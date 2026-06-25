export const POSITIONS_BY_VIEW = {
  front: [
    {
      id: "chest-right",
      label: "Peito Esquerdo",
      hint: "Clique no + adicionar uma imagem personalizada",
    },
    {
      id: "center-front",
      label: "Centro Frente",
      hint: "Clique no + adicionar uma imagem personalizada",
    },
  ],
  back: [
    {
      id: "center-back",
      label: "Centro costas",
      hint: "Clique no + adicionar uma imagem personalizada",
    },
  ],
};

export const getPositionsByView = (view) =>
  POSITIONS_BY_VIEW[view] || POSITIONS_BY_VIEW.front;
