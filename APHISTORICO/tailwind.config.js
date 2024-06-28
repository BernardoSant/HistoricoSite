/** @type {import('tailwindcss').Config} */

export const Cor = "rgb(61, 112, 226)";

export function CorEscura(Intencidade) {
  // Função para misturar uma cor com preto e criar uma versão mais escura
  function darkenColor(rgb, amount) {
    rgb = rgb.replace(/[^\d,]/g, "").split(",");
    for (let i = 0; i < rgb.length; i++) {
      rgb[i] = Math.round(parseInt(rgb[i]) * (1 - amount));
      if (rgb[i] < 0) rgb[i] = 0;
    }
    return `rgb(${rgb.join(",")})`;
  }

  const CorEscura = darkenColor(Cor, Number(Intencidade));

  return CorEscura;
}

export function CorClara(Intencidade) {
  function lightenColor(rgb, amount) {
    rgb = rgb.replace(/[^\d,]/g, "").split(",");
    for (let i = 0; i < rgb.length; i++) {
      rgb[i] = Math.round(parseInt(rgb[i]) + (255 - parseInt(rgb[i])) * amount);
      if (rgb[i] > 255) rgb[i] = 255;
    }
    return `rgb(${rgb.join(",")})`;
  }

  const CorClara = lightenColor(Cor, Number(Intencidade));

  return CorClara;
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        CorPrimariaBT: CorClara(0),
        CorSecundariaBT: CorEscura(0.1),
        CorTerciariaBT: CorClara(0.5),
        CorEscurecidaBT: CorEscura(0.3),
        CorPrimariaTBLA: CorClara(0.2),
        CorSecundariaTBLA: CorClara(0.7),
        CorTerciariaTBLA: CorClara(0.5),
        CorEscurecidaTBLA: CorEscura(0.2),
        CorEscura: CorClara(0.6),
      },
    },
  },
  plugins: [],
};
