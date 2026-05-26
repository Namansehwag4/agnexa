type RateLimitRecord = {
  timestamps: number[];
};

const tracker = new Map<string, RateLimitRecord>();

// Clean up tracker periodically to avoid memory leaks
if (typeof global !== "undefined") {
  const globalAny = global as any;
  if (!globalAny.rateLimitCleanupInterval) {
    globalAny.rateLimitCleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, record] of tracker.entries()) {
        const activeTimestamps = record.timestamps.filter((t) => now - t < 15 * 60 * 1000); // 15 mins window max
        if (activeTimestamps.length === 0) {
          tracker.delete(key);
        } else {
          record.timestamps = activeTimestamps;
        }
      }
    }, 5 * 60 * 1000); // every 5 minutes
  }
}

export function rateLimit(ip: string, limit = 10, windowMs = 60 * 1000) {
  const now = Date.now();
  
  if (!tracker.has(ip)) {
    tracker.set(ip, { timestamps: [now] });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  const record = tracker.get(ip)!;
  
  // Filter out timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    return {
      success: false,
      remaining: 0,
      reset: oldest + windowMs
    };
  }

  record.timestamps.push(now);
  return {
    success: true,
    remaining: limit - record.timestamps.length,
    reset: now + windowMs
  };
}

export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}
