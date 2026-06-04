export function CrisisBanner() {
  return (
    <div
      role="alert"
      className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-sm text-amber-950"
    >
      <p className="max-w-3xl mx-auto text-center leading-relaxed">
        <strong>긴급 상황</strong>에는 AI 상담 대신 전문 기관에 연락하세요.{' '}
        자살예방상담전화 <strong>1393</strong> · 응급 <strong>119</strong>
      </p>
    </div>
  )
}
