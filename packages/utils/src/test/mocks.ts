// Mock data generators
export const mockUser = (overrides = {}) => ({
  id: "1",
  name: "Test User",
  email: "test@example.com",
  role: "user",
  ...overrides,
});

export const mockPost = (overrides = {}) => ({
  id: "1",
  title: "Test Post",
  content: "Test content",
  authorId: "1",
  createdAt: new Date().toISOString(),
  ...overrides,
});

// API mock helpers
export const mockApiResponse = <T>(data: T, delay = 0) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const mockApiError = (message = "API Error", delay = 0) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
};

// Local Storage mock
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
  };
};

// Window mock
export const mockWindow = (overrides: any = {}) => ({
  location: {
    href: "http://localhost:3000",
    pathname: "/",
    search: "",
    hash: "",
    ...(overrides.location || {}),
  },
  ...overrides,
});

// Fetch mock
export const mockFetch = (response: any, ok = true) => {
  return jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      status: ok ? 200 : 400,
    }),
  );
};

// IntersectionObserver mock
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();

  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver as any;
};

// ResizeObserver mock
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn();

  mockResizeObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.ResizeObserver = mockResizeObserver as any;
};
