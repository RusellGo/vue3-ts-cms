class LocalCache {
  /**
   * 设置缓存
   * @param key 缓存键
   * @param value 缓存值
   */
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取缓存
   * @param key 缓存键
   * @returns 缓存值
   */
  getCache(key: string) {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  /**
   * 删除缓存
   * @param key 传入要删除的缓存键
   */
  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  /**
   * 清空缓存
   */
  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
