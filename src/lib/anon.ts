export function getAnonId() {
  if (typeof window === "undefined") return null;
  try {
    let id = localStorage.getItem("as:anon");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("as:anon", id);
    }
    return id;
  } catch {
    return null;
  }
}
