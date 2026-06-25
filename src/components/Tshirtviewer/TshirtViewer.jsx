import { PRODUCTS } from "../../colorMap.js";
import "./tshirt.css";

const POSITION_STYLES = {
  "chest-right": { top: "34%", left: "57%", transform: "translate(-50%, -50%)" },
  "center-front": { top: "50%", left: "51%", transform: "translate(-50%, -50%)" },
  "center-back": { top: "47%", left: "50%", transform: "translate(-50%, -50%)" },
};

const VIEW_SLOTS = {
  front: ["chest-right", "center-front"],
  back: ["center-back"],
};

export default function Tshirtviewer({ productType, color, view, slots }) {
  const currentProductColors = PRODUCTS[productType].colors;
  const selectedColor =
    currentProductColors[color] ?? Object.values(currentProductColors)[0];
  const tshirtImage =
    view === "back" && selectedColor.back
      ? selectedColor.back
      : selectedColor.front;
  const activeSlots = VIEW_SLOTS[view] ?? VIEW_SLOTS.front;

  return (
    <div className="tshirt-frame">
      <div className="tshirt-container">
        <img
          className="tshirt-image"
          src={tshirtImage}
          alt={`${productType === "tshirt" ? "T-shirt" : "Sweatshirt"} ${color} ${view}`}
        />

        {activeSlots.map((slotId) => {
          const slot = slots[slotId];
          if (!slot?.image) return null;

          return (
            <img
              key={slotId}
              className={`tshirt-logo tshirt-logo-${slotId}`}
              src={slot.image}
              alt=""
              style={{
                width: `${slot.size}px`,
                ...POSITION_STYLES[slotId],
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
