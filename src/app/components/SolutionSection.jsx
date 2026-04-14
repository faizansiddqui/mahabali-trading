"use client";

export default function SolutionSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="text-center space-y-6">
            <div className="inline-block bg-green-100 px-4 py-2 rounded-full">
              <p className="text-green-700 font-semibold text-sm">
                THE SOLUTION
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Learn to Read the Market,
              <span className="block text-amber-500 mt-2">Don&apos;t Guess</span>
            </h2>

            <div className="bg-gradient-to-r from-amber-400 to-orange-400 h-1 w-24 mx-auto rounded-full"></div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Our proven 10-day training system teaches you to understand market
              structure, price action, and real trading mechanics. No guesswork.
              No emotional trading. Just pure market reading and execution.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-500">📚</div>
                <h3 className="font-bold text-slate-900">Expert Knowledge</h3>
                <p className="text-slate-600 text-sm">
                  14 years of trading experience condensed into 10 days
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-500">🎯</div>
                <h3 className="font-bold text-slate-900">Practical Training</h3>
                <p className="text-slate-600 text-sm">
                  Live examples and real market scenarios
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-500">⚙️</div>
                <h3 className="font-bold text-slate-900">Complete Strategy</h3>
                <p className="text-slate-600 text-sm">
                  Strategy + Execution framework included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
