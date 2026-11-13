import Image from 'next/image';

// AboutSection – left image, right text
export function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left side image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          {/* Placeholder image – replace with actual about image */}
          <Image
            src="/imagem.webp"
            alt="About the company"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        {/* Right side text */}
        
        <div className="w-full md:w-1/2 md:pl-12">
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
              JUNTOS DESDE 2013
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nossa história, nosso compromisso.
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Tudo começou em 2023 com o sonho de oferecer um serviço cada vez mais completo aos nossos clientes. Ao lado da oficina, surgiu a ideia de abrir uma loja de autopeças, facilitando a vida de quem precisava de consertos, peças e baterias.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Percebemos que muitos clientes precisavam procurar peças em outros lugares depois de identificar um problema no veículo. Decidimos então unir a oficina à loja, trazendo mais praticidade, agilidade e confiança.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Hoje, loja e oficina trabalham lado a lado, compartilhando o compromisso de cuidar de cada veículo com responsabilidade, dedicação e respeito aos nossos clientes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;