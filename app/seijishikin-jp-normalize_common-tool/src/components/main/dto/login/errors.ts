export class AccessTokenNotFoundError extends Error {
  constructor(message = 'アクセストークンが見つかりません。') {
    super(message);
    this.name = 'AccessTokenNotFoundError';
  }
}

export class TokenRefreshError extends Error {
  constructor(message = 'トークンのリフレッシュに失敗しました。') {
    super(message);
    this.name = 'TokenRefreshError';
  }
}

export class PasskeyAuthenticationError extends Error {
  constructor(message = 'パスキー認証に失敗しました。') {
    super(message);
    this.name = 'PasskeyAuthenticationError';
  }
}

export class PasskeyNotSupportedError extends Error {
  constructor(message = 'お使いのブラウザまたは端末はパスキー認証に対応していません。') {
    super(message);
    this.name = 'PasskeyNotSupportedError';
  }
}

export class PasskeyCancellationError extends Error {
  constructor(message = 'パスキー認証操作がキャンセルされました。') {
    super(message);
    this.name = 'PasskeyCancellationError';
  }
}

export class PreAuthTokenExpiredError extends Error {
  constructor(message = '一時認証トークンの有効期限が切れています。最初からログインし直してください。') {
    super(message);
    this.name = 'PreAuthTokenExpiredError';
  }
}
