import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용약관',
  description: 'PickForMe 서비스 이용약관',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">서비스 이용약관</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
              <p className="text-gray-600">
                이 약관은 PickForMe(이하 "회사")가 제공하는 상품 추천 서비스(이하 "서비스")의
                이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항 등을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li><strong>"서비스"</strong>란 회사가 제공하는 상품 추천, 가격 비교 등의 온라인 서비스를 말합니다.</li>
                <li><strong>"이용자"</strong>란 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                <li><strong>"회원"</strong>이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                <li><strong>"비회원"</strong>이란 회원에 가입하지 않고 서비스를 이용하는 자를 말합니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
                <li>변경된 약관은 공지사항을 통해 공지하며, 공지 후 7일이 경과하면 효력이 발생합니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공)</h2>
              <p className="text-gray-600 mb-4">회사는 다음과 같은 서비스를 제공합니다.</p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>맞춤형 상품 추천 서비스</li>
                <li>상품 정보 및 가격 비교 서비스</li>
                <li>테스트 결과 저장 및 공유 서비스</li>
                <li>기타 회사가 정하는 서비스</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (서비스 이용)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
                <li>회사는 시스템 점검, 증설 및 교체, 통신 두절 등의 사유가 발생한 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                <li>회사는 서비스 중단의 경우 사전에 공지하며, 불가피한 경우 사후에 공지할 수 있습니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (회원가입)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의함으로써 회원가입을 신청합니다.</li>
                <li>회사는 전항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                    <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>기타 회원으로 등록하는 것이 서비스 운영에 현저히 지장이 있다고 판단되는 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (회원 탈퇴 및 자격 상실)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>회원은 언제든지 서비스 내 탈퇴 기능을 통해 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다.</li>
                <li>회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 또는 정지시킬 수 있습니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입 신청 시 허위 내용을 등록한 경우</li>
                    <li>다른 이용자의 서비스 이용을 방해하는 경우</li>
                    <li>서비스를 이용하여 법령 또는 이 약관이 금지하는 행위를 하는 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (이용자의 의무)</h2>
              <p className="text-gray-600 mb-4">이용자는 다음 행위를 하여서는 안 됩니다.</p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>신청 또는 변경 시 허위 내용의 등록</li>
                <li>회사가 게시한 정보의 무단 변경</li>
                <li>회사가 정한 정보 이외의 정보(프로그램 등) 송신 또는 게시</li>
                <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 영상, 음성 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제9조 (제휴 서비스 및 광고)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>회사는 서비스 운영과 관련하여 제휴사의 상품 정보 및 광고를 게재할 수 있습니다.</li>
                <li>회사는 쿠팡 파트너스, 알리익스프레스 등 제휴 프로그램에 참여하고 있으며, 이용자가 제휴 링크를 통해 상품을 구매할 경우 일정 수수료를 받을 수 있습니다.</li>
                <li>제휴 링크를 통한 구매 시 발생하는 모든 거래는 해당 쇼핑몰의 정책을 따르며, 회사는 이에 대해 책임지지 않습니다.</li>
              </ol>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                <p className="text-yellow-800 text-sm">
                  이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (면책조항)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>회사는 천재지변, 전쟁, 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.</li>
                <li>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</li>
                <li>회사는 서비스를 통해 제공되는 상품 정보의 정확성을 보장하지 않으며, 실제 상품과 차이가 있을 수 있습니다.</li>
                <li>회사는 이용자가 서비스를 통해 연결된 외부 사이트에서 발생한 손해에 대해 책임을 지지 않습니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제11조 (분쟁해결)</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위해 노력합니다.</li>
                <li>서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우, 회사의 본사 소재지를 관할하는 법원을 관할법원으로 합니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">부칙</h2>
              <p className="text-gray-600">이 약관은 2024년 1월 1일부터 시행합니다.</p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-gray-500 text-sm">
                <strong>시행일자:</strong> 2024년 1월 1일
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
