export function getErrorMessage(reason: any, isNotInquiry: boolean): string {
    const BLANK: string = "";
    // エラーを投げずに中断した?
    if (undefined === reason || null === reason || BLANK === reason) {
        return "システムエラーが発生しました。システム管理者にお問い合わせください";
    }
    if (reason instanceof Error && isNotInquiry) {
        // 問い合わせが不適切でやり直しが適当な場合などのため問い合わせ教示はなし
        return reason.message;
    } else {
        // 問い合わせ教示を追加(front errorなど)
        return "処理が中断しました。システム管理者にお問い合わせください(" + reason + ")";
    }
}

export function getErrorUniqueIdMessage(selectedNo: number | string): string {

    let selected: number | string = selectedNo
    if (undefined === selected || null === selected) {
        selected = "-";
    }
    return "不正な値が選択されました。一度検索処理からやり直し、修正できない場合はシステム管理者にお問い合わせください("
        + selectedNo + ")";
}