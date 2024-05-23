export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ cost: "Миллион долларов" });
  }
  return res.status(401).json({ message: "Method not allowed" });
}
