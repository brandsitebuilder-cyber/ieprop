export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="bg-brand text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">About ieProp</h1>
          <p className="mt-4 text-brand-100 text-lg max-w-2xl mx-auto">
            An Investment Evolution in Property
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Who We Are */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            ieProp is a premier high-end real estate investment agency offering bespoke services to
            local and international clients. With a deep understanding of the local and international
            markets, we pride ourselves on delivering personalised services tailored for our clients
            and investors. Our team of seasoned real estate investment experts are committed to
            helping you find your dream investment.
          </p>
        </div>

        {/* What We Do */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What We Do</h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto text-center mb-10">
            At ieProp, we excel at connecting prime residential, commercial, and industrial
            investment properties with the right investors. We translate the fundamental parameters
            defining the investment case in clear and simple language, allowing both the
            investor/buyer and the seller to articulate their investment objectives effectively.
          </p>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose ieProp?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                num: "01",
                title: "Exclusive Investment Properties",
                desc: "Access a curated portfolio of prime residential, commercial, industrial, and agricultural properties in sought-after locations.",
              },
              {
                num: "02",
                title: "Maximised Selling Potential",
                desc: "Our strategic approach ensures your property reaches the right investors at the right value — maximising returns.",
              },
              {
                num: "03",
                title: "Investment Advisory",
                desc: "Expert guidance from seasoned professionals who understand both local and international real estate markets.",
              },
              {
                num: "04",
                title: "Ready-to-Develop Land",
                desc: "Access to serviced, ready-to-develop land for investors looking to build or expand their portfolios.",
              },
              {
                num: "05",
                title: "Efficient Transactions",
                desc: "Streamlined processes that get projects moving quickly, from initial enquiry to final handover.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <span className="text-3xl font-bold text-brand-200">{item.num}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">{item.title}</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
