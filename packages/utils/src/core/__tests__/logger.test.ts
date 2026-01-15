describe('logger', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('development', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should log info messages', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const { logger } = await import('../logger');

      logger.info('test info', 123);
      expect(consoleSpy).toHaveBeenCalledWith('[IdeasUI] test info', 123);
      consoleSpy.mockRestore();
    });

    it('should log warn messages', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { logger } = await import('../logger');

      logger.warn('test warn');
      expect(consoleSpy).toHaveBeenCalledWith('[IdeasUI] test warn');
      consoleSpy.mockRestore();
    });

    it('should log error messages', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const { logger } = await import('../logger');

      logger.error('test error');
      expect(consoleSpy).toHaveBeenCalledWith('[IdeasUI] test error');
      consoleSpy.mockRestore();
    });

    it('should throw errors when throw is called', async () => {
      const { logger } = await import('../logger');
      expect(() => logger.throw('fail')).toThrow('[IdeasUI] fail');
    });

    it('should throw error when assertion fails', async () => {
      const { logger } = await import('../logger');
      expect(() => logger.assert(false, 'failed')).toThrow('[IdeasUI] Assertion failed: failed');
    });

    it('should not throw when assertion passes', async () => {
      const { logger } = await import('../logger');
      expect(() => logger.assert(true, 'pass')).not.toThrow();
    });
  });

  describe('production', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should not log info messages', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const { logger } = await import('../logger');

      logger.info('test info');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should not log warn messages', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { logger } = await import('../logger');

      logger.warn('test warn');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should not log error messages', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const { logger } = await import('../logger');

      logger.error('test error');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should not throw when throw is called', async () => {
      const { logger } = await import('../logger');
      expect(() => logger.throw('fail')).not.toThrow();
    });

    it('should not throw when assertion fails', async () => {
      const { logger } = await import('../logger');
      expect(() => logger.assert(false, 'failed')).not.toThrow();
    });
  });
});
