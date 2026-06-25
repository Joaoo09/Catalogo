import { useCallback } from "react";
import "./PositionSelector.css";
import { getPositionsByView } from "./positions.js";

export default function PositionSelector({
  view,
  selected,
  onPositionChange,
  slots,
  onImageUpload,
  onImageRemove,
}) {
  const positions = getPositionsByView(view);

  const handleImageChange = useCallback(
    (positionId, event) => {
      const file = event.target.files[0];
      if (file) {
        onImageUpload(positionId, URL.createObjectURL(file));
      }
      event.target.value = "";
    },
    [onImageUpload]
  );

  return (
    <div className="section position-section">
      <div className="section-heading-row">
      <h3>Posição + 
         Imagem Personalizada</h3>
        <span className="position-count">
          {positions.filter((position) => slots[position.id]?.image).length}/{positions.length}
        </span>
      </div>

      <div className="position-options" role="radiogroup" aria-label="Posicao da imagem">
        {positions.map((position) => {
          const image = slots[position.id]?.image;
          const occupied = Boolean(image);
          const active = selected === position.id;
          const inputId = `slot-input-${position.id}`;

          if (occupied) {
            return (
              <div
                key={position.id}
                className={`position-btn ${active ? "active" : ""} occupied`}
                role="radio"
                aria-checked={active}
                onClick={() => onPositionChange(position.id)}
              >
                <span className="position-preview" aria-hidden="true">
                  <img className="position-preview-image" src={image} alt="" />
                </span>
                <span className="position-copy">
                  <span className="position-label">{position.label}</span>
                </span>
                <span className="position-actions">
                  <button
                    type="button"
                    className="position-remove"
                    aria-label={`Remover imagem de ${position.label}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onImageRemove(position.id);
                    }}
                  >
                    ×
                  </button>
                </span>
              </div>
            );
          }

          return (
            <div
              key={position.id}
              className={`position-btn ${active ? "active" : ""} empty`}
              onClick={() => onPositionChange(position.id)}
            >
              <span className="position-copy">
                <span className="position-label">{position.label}</span>
                <span className="position-hint">{position.hint}</span>
              </span>
              <span className="position-actions">
                <label 
                  className="position-add" 
                  htmlFor={inputId} 
                  aria-label={`Adicionar imagem para ${position.label}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  +
                </label>
              </span>
              <input
                id={inputId}
                type="file"
                accept=".png, .svg, image/png, image/svg+xml"
                onChange={(e) => handleImageChange(position.id, e)}
                hidden
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
