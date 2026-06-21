import importlib.util
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "sync_gestionale.py"
SPEC = importlib.util.spec_from_file_location("sync_gestionale", SCRIPT)
assert SPEC and SPEC.loader
sync = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(sync)


class GestionaleSyncTests(unittest.TestCase):
    def test_referenced_images_include_photos_and_floorplans(self):
        properties = [{
            "image": "/images/gestionale/gi-1-cover.jpg",
            "images": ["/images/gestionale/gi-1-cover.jpg", "/images/gestionale/gi-1-room.jpg"],
            "floorplans": ["/images/gestionale/gi-1-plan.png"],
        }]

        self.assertEqual(
            sync.referenced_gestionale_images(properties),
            {"gi-1-cover.jpg", "gi-1-room.jpg", "gi-1-plan.png"},
        )

    def test_orphaned_images_are_removed_but_current_images_remain(self):
        with tempfile.TemporaryDirectory() as temp_name:
            image_dir = Path(temp_name)
            current = image_dir / "gi-current.jpg"
            orphan = image_dir / "gi-deleted.jpg"
            unrelated = image_dir / "manual-image.jpg"
            current.touch()
            orphan.touch()
            unrelated.touch()

            original_dir = sync.IMAGE_DIR
            sync.IMAGE_DIR = image_dir
            try:
                removed = sync.remove_orphaned_images([{
                    "image": "/images/gestionale/gi-current.jpg",
                    "images": [],
                    "floorplans": [],
                }])
            finally:
                sync.IMAGE_DIR = original_dir

            self.assertEqual(removed, 1)
            self.assertTrue(current.exists())
            self.assertFalse(orphan.exists())
            self.assertTrue(unrelated.exists())


if __name__ == "__main__":
    unittest.main()
