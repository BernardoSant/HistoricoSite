import { Cor } from "../../tailwind.config";

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
