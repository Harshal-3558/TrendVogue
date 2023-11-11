export default function handler(req, res) {
  const pincodes = {
    410206: ["Panvel", "Maharashtra"],
    410207: ["Kamothe", "Maharashtra"],
    208001: ["Kanpur", "Uttar Pradesh"],
    530068: ["Bengaluru", "Karnataka"],
    110025: ["Noida", "Delhi"],
    600001: ["Chennai", "Tamil-Nadu"],
  };
  res.status(200).json(pincodes);
}
