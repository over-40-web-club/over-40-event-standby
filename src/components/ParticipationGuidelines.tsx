export const ParticipationGuidelines = () => {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-semibold">ご参加前の確認事項</h2>
      <ul className="text-left space-y-3 max-w-xl mx-auto">
        <li className="flex items-start space-x-2">
          <span className="text-blue-300">•</span>
          <span>マイクOFFをお願いいたします</span>
        </li>
        <li className="flex items-start space-x-2">
          <span className="text-blue-300">•</span>
          <span>質問等はチャット機能をご利用ください</span>
        </li>
        <li className="flex items-start space-x-2">
          <span className="text-blue-300">•</span>
          <span>チャットの宛先は「全員」を指定してください</span>
        </li>
      </ul>
    </div>
  );
};