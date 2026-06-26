import { useState } from "react";
import { PRODUCTS, ART_GALLERY } from "./colorMap.js";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/SideBar/Sidebar.jsx";
import Tshirtviewer from "./components/Tshirtviewer/TshirtViewer.jsx";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

const INITIAL_SLOTS = {
  "chest-right": { image: null, size: 180 },
  "center-front": { image: null, size: 180 },
  "center-back": { image: null, size: 180 },
};

const DEFAULT_POSITION_BY_VIEW = {
  front: "chest-right",
  back: "center-back",
};

const POSITIONS_BY_VIEW = {
  front: ["chest-right", "center-front"],
  back: ["center-back"],
};

function App() {
  const [productType, setProductType] = useState("tshirt");
  const [color, setColor] = useState("Branco");
  const [view, setView] = useState("front");
  const [position, setPosition] = useState("chest-right");
  const [slots, setSlots] = useState(INITIAL_SLOTS);

  const handleProductTypeChange = (newType) => {
    setProductType(newType);
    const availableColors = Object.keys(PRODUCTS[newType].colors);
    if (!availableColors.includes(color)) {
      setColor(availableColors[0]);
    }
    setView("front"); // Reset view when changing product type to be safe
  };

  const handleViewChange = (nextView) => {
    setView(nextView);
    setPosition((currentPosition) => {
      const visiblePositions = POSITIONS_BY_VIEW[nextView] || POSITIONS_BY_VIEW.front;
      return visiblePositions.includes(currentPosition)
        ? currentPosition
        : DEFAULT_POSITION_BY_VIEW[nextView];
    });
  };

  const handleImageUpload = (slotId, url) => {
    setSlots((prev) => {
      if (prev[slotId].image) return prev;
      return { ...prev, [slotId]: { ...prev[slotId], image: url } };
    });
    setPosition(slotId);
  };

  const handleSizeChange = (val) => {
    setSlots((prev) => ({
      ...prev,
      [position]: { ...prev[position], size: Number(val) },
    }));
  };

  const handleClear = (slotId) => {
    setSlots((prev) => ({
      ...prev,
      [slotId]: { image: null, size: 180 },
    }));
    setPosition(slotId);
  };

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar
          productType={productType}
          onProductTypeChange={handleProductTypeChange}
          color={color}
          view={view}
          position={position}
          currentSlot={slots[position]}
          onColorChange={setColor}
          onViewChange={handleViewChange}
          onPositionChange={setPosition}
          onSizeChange={handleSizeChange}
          slots={slots}
          onImageUpload={handleImageUpload}
          onImageRemove={handleClear}
          galleryImages={ART_GALLERY}
        />
        <main className="conteudo">
          <Tshirtviewer
            productType={productType}
            color={color}
            view={view}
            slots={slots}
          />
        </main>
      </div>
      <SpeedInsights />
    </>
  );
}

export default App;
