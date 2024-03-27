import { useEffect, useState } from "react";

export const LoaderClin = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Aqui você pode definir o tempo de execução em milissegundos

    return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <p className="absolute top-0 right-0  w-full h-full z-20 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center relative">
        <div class="spinner"></div>
        <div data-text="Carregando" class="text"></div>
      </div>
    </p>
  );
};
