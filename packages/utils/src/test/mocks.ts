// // Mock data generators
// export const mockUser = (overrides = {}) => ({
//   id: "1",
//   name: "Test User",
//   email: "test@example.com",
//   role: "user",
//   ...overrides,
// });

// export const mockPost = (overrides = {}) => ({
//   id: "1",
//   title: "Test Post",
//   content: "Test content",
//   authorId: "1",
//   createdAt: new Date().toISOString(),
//   ...overrides,
// });

// // API mock helpers
// export const mockApiResponse = <T>(data: T, delay = 0) => {
//   return new Promise<T>((resolve) => {
//     setTimeout(() => resolve(data), delay);
//   });
// };

// export const mockApiError = (message = "API Error", delay = 0) => {
//   return new Promise((_, reject) => {
//     setTimeout(() => reject(new Error(message)), delay);
//   });
// };

// // Local Storage mock
// export const mockLocalStorage = () => {
//   const store: Record<string, string> = {};

//   return {
//     getItem: vi.fn((key: string) => store[key] || null),
//     setItem: vi.fn((key: string, value: string) => {
//       store[key] = value;
//     }),
//     removeItem: vi.fn((key: string) => {
//       delete store[key];
//     }),
//     clear: vi.fn(() => {
//       Object.keys(store).forEach((key) => delete store[key]);
//     }),
//   };
// };

// // Window mock
// export const mockWindow = (overrides: any = {}) => ({
//   location: {
//     href: "http://localhost:3000",
//     pathname: "/",
//     search: "",
//     hash: "",
//     ...(overrides.location || {}),
//   },
//   ...overrides,
// });

// // Fetch mock
// export const mockFetch = (response: any, ok = true) => {
//   return vi.fn(() =>
//     Promise.resolve({
//       ok,
//       json: () => Promise.resolve(response),
//       text: () => Promise.resolve(JSON.stringify(response)),
//       status: ok ? 200 : 400,
//     }),
//   );
// };

// // IntersectionObserver mock
// export const mockIntersectionObserver = () => {
//   const mockIntersectionObserver = vi.fn();

//   mockIntersectionObserver.mockReturnValue({
//     observe: vi.fn(),
//     unobserve: vi.fn(),
//     disconnect: vi.fn(),
//   });
//   window.IntersectionObserver = mockIntersectionObserver as any;
// };

// // ResizeObserver mock
// export const mockResizeObserver = () => {
//   const mockResizeObserver = vi.fn();

//   mockResizeObserver.mockReturnValue({
//     observe: vi.fn(),
//     unobserve: vi.fn(),
//     disconnect: vi.fn(),
//   });
//   window.ResizeObserver = mockResizeObserver as any;
// };
