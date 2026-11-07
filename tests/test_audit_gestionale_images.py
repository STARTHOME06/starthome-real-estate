import json
import tempfile
import unittest
from pathlib import Path

from scripts.audit_gestionale_images import inventory


class ImageStorageAuditTests(unittest.TestCase):
    def test_inventory_is_read_only_and_flags_missing_and_duplicate_images(self):
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp)
            photos = base / "images"
            photos.mkdir()
            (photos / "gi-1-a.jpg").write_bytes(b"same")
            (photos / "gi-1-a.png").write_bytes(b"same")
            (photos / "gi-old.png").write_bytes(b"unused")
            props = base / "properties.json"
            props.write_text(json.dumps([{
                "image": "/images/gestionale/gi-1-a.jpg",
                "images": ["/images/gestionale/gi-missing.jpg"],
                "floorplans": [],
            }]), encoding="utf-8")
            result = inventory(photos, props)
            self.assertEqual(result["images"], 3)
            self.assertEqual(result["bytes"], 14)
            self.assertIn("gi-missing.jpg", result["missing_references"])
            self.assertEqual(result["unreferenced"], ["gi-1-a.png", "gi-old.png"])
            self.assertEqual(result["same_stem_different_extension"], [["gi-1-a.jpg", "gi-1-a.png"]])
            self.assertEqual(result["identical_content"], [["gi-1-a.jpg", "gi-1-a.png"]])
            self.assertTrue((photos / "gi-old.png").exists())


if __name__ == "__main__":
    unittest.main()
