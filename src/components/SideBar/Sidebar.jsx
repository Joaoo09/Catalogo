import { useEffect, useState } from "react";
import { PRODUCTS, getColorHex } from "../../colorMap.js";
import PositionSelector from "../PositionSelector/PositionSelector.jsx";
import { getPositionsByView } from "../PositionSelector/positions.js";
import "./sidebar.css";

export default function Sidebar({
  productType,
  onProductTypeChange,
  color,
  view,
  position,
  currentSlot,
  slots,
  onColorChange,
  onViewChange,
  onImageUpload,
  onSizeChange,
  onImageRemove,
  onPositionChange,
  galleryImages,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const currentProductColors = PRODUCTS[productType].colors;
  const colorList = Object.values(currentProductColors);
  const selectedColor = currentProductColors[color] || colorList[0];
  const image = currentSlot?.image;
  const size = currentSlot?.size || 180;

  const getColorStyle = (shirtColor) => {
    const colorValue = getColorHex(productType, shirtColor.name);

    if (colorValue.startsWith("/")) {
      return {
        backgroundImage: `url(${colorValue})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      };
    }

    return { backgroundColor: colorValue };
  };

  const handleViewChange = (nextView) => {
    onViewChange(nextView);
    const availablePositions = getPositionsByView(nextView);
    if (availablePositions.length > 0) {
      onPositionChange(availablePositions[0].id);
    }
  };

  const handleColorChange = (shirtColor) => {
    onColorChange(shirtColor.name);
    if (view === "back" && !shirtColor.back) {
      handleViewChange("front");
    }
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={`sidebar-toggle ${isOpen ? "sidebar-toggle--open" : ""}`}
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-controls="customization-sidebar"
        aria-label={isOpen ? "Fechar menu de personalizacao" : "Abrir menu de personalizacao"}
      >
        <span className="sidebar-toggle-bar" aria-hidden="true" />
        <span className="sidebar-toggle-bar" aria-hidden="true" />
        <span className="sidebar-toggle-bar" aria-hidden="true" />
      </button>

      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        id="customization-sidebar"
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
      >
        <div className="section">
          <h3>Produto</h3>
          <div className="view-options">
            <button
              type="button"
              className={`view-btn ${productType === "tshirt" ? "active" : ""}`}
              onClick={() => onProductTypeChange("tshirt")}
            >
              T-Shirt
            </button>
            <button
              type="button"
              className={`view-btn ${productType === "sweatshirt" ? "active" : ""}`}
              onClick={() => onProductTypeChange("sweatshirt")}
            >
              Sweatshirt
            </button>
          </div>
        </div>

        <div className={`section color-dropdown ${isColorOpen ? "color-dropdown--open" : ""}`}>
        <h3>Cor {productType === "tshirt" ? "da T-shirt" : "da Sweatshirt"}</h3>
        <button
          type="button"
          className="color-dropdown-trigger"
          onClick={() => setIsColorOpen((prev) => !prev)}
          aria-expanded={isColorOpen}
          aria-haspopup="listbox"
        >
          <span
            className="color-dropdown-swatch"
            style={getColorStyle(selectedColor)}
            aria-hidden="true"
          />
          <span className="color-dropdown-label">{color}</span>
          <span className={`color-dropdown-chevron ${isColorOpen ? "color-dropdown-chevron--open" : ""}`} aria-hidden="true">
            ▾
          </span>
        </button>

        <div
          className="color-dropdown-panel"
          role="listbox"
          aria-label="Cor da T-shirt"
          aria-hidden={!isColorOpen}
        >
          <div className="color-dropdown-panel-inner">
            <div className="color-options">
              {colorList.map((shirtColor) => (
                <button
                  key={shirtColor.name}
                  type="button"
                  role="option"
                  aria-selected={color === shirtColor.name}
                  className={color === shirtColor.name ? "active" : ""}
                  onClick={() => handleColorChange(shirtColor)}
                  title={shirtColor.name}
                  aria-label={shirtColor.name}
                  style={getColorStyle(shirtColor)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Vista</h3>
        <div className="view-options">
          <button
            type="button"
            className={`view-btn ${view === "front" ? "active" : ""}`}
            onClick={() => handleViewChange("front")}
          >
            Frente
          </button>
          <button
            type="button"
            className={`view-btn ${view === "back" ? "active" : ""}`}
            onClick={() => handleViewChange("back")}
            disabled={!currentProductColors[color]?.back}
            title={!currentProductColors[color]?.back ? "Verso indisponivel para esta cor" : ""}
          >
            Verso
          </button>
        </div>
      </div>

      <PositionSelector
        view={view}
        selected={position}
        onPositionChange={onPositionChange}
        slots={slots}
        onImageUpload={onImageUpload}
        onImageRemove={onImageRemove}
      />

      {image && (
        <div className="section">
          <h3>Ajustes</h3>
          <div className="size-label">
            <span>Tamanho</span>
            <span>{size}px</span>
          </div>
          <input
            type="range"
            min="50"
            max="250"
            value={size}
            onChange={(e) => onSizeChange(e.target.value)}
          />
        </div>
      )}

      <div className="section">
        <h3>Catálogo de Bordados</h3>
        <div className="catalog-grid">
          {galleryImages && galleryImages.map((design) => (
            <button
              key={design.id}
              className="catalog-item"
              onClick={() => onImageUpload(position, design.url)}
              title={design.name}
              type="button"
            >
              <img src={design.url} alt={design.name} />
            </button>
          ))}
        </div>
      </div>
      </aside>
    </>
  );
}
