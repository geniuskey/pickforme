import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'PickForMe 개인정보처리방침',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              PickForMe(이하 "회사")는 이용자의 개인정보를 중요시하며,
              「개인정보 보호법」을 준수하고 있습니다.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 수집하는 개인정보 항목</h2>
              <p className="text-gray-600 mb-4">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>필수항목:</strong> 이메일 주소 (회원가입 시)</li>
                <li><strong>자동수집항목:</strong> 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 수집 및 이용목적</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>서비스 제공 및 운영</li>
                <li>회원 관리 및 본인 확인</li>
                <li>맞춤형 상품 추천 서비스 제공</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
                <li>이용자 문의 대응</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <p className="text-gray-600 mb-4">
                회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>회원 정보:</strong> 회원 탈퇴 시까지</li>
                <li><strong>서비스 이용기록:</strong> 3년</li>
              </ul>
              <p className="text-gray-600 mt-4">
                단, 관계법령에 의해 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-600">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                다만, 아래의 경우에는 예외로 합니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 쿠키(Cookie)의 사용</h2>
              <p className="text-gray-600 mb-4">
                회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 쿠키를 사용합니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>쿠키는 웹사이트가 이용자의 브라우저에 전송하는 소량의 정보입니다.</li>
                <li>이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</li>
                <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 개인정보의 파기</h2>
              <p className="text-gray-600">
                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
                지체없이 해당 개인정보를 파기합니다.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li><strong>전자적 파일:</strong> 복구 불가능한 방법으로 영구 삭제</li>
                <li><strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 이용자의 권리</h2>
              <p className="text-gray-600 mb-4">이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 개인정보 보호책임자</h2>
              <p className="text-gray-600">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                개인정보 처리와 관련한 이용자의 불만처리 및 피해구제를 위하여
                아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-600">
                  <strong>개인정보 보호책임자</strong><br />
                  이메일: privacy@pickforme.com
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 개인정보처리방침의 변경</h2>
              <p className="text-gray-600">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가,
                삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
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
