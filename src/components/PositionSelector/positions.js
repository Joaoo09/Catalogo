export const POSITIONS_BY_VIEW = {
  front: [
    {
      id: "chest-right",
      label: "Peito esquerdo",
      hint: "Clique para adicionar uma imagem",
    },
    {
      id: "center-front",
      label: "Centro frente",
      hint: "Clique para adicionar uma imagem",
    },
  ],
  back: [
    {
      id: "center-back",
      label: "Centro costas",
      hint: "Clique para adicionar uma imagem",
    },
  ],
};

export const getPositionsByView = (view) =>
  POSITIONS_BY_VIEW[view] || POSITIONS_BY_VIEW.front;
