export const defaultWord = {
  hirakata: "",
  kanji: null,
  imi: "",
  note: null,
  tags: null,
  verbType: "",
  masuForm: null,
  teForm: null,
  taForm: null,
  naiForm: null,
}

const convertedPart = {
  'う': { masu: 'います', nai: 'わない', te: 'って', ta: 'った' },
  'つ': { masu: 'ちます', nai: 'だない', te: 'って', ta: 'った' },
  'る': { masu: 'ります', nai: 'らない', te: 'って', ta: 'った' },
  'く': { masu: 'きます', nai: 'かない', te: 'いて', ta: 'いた' },
  'ぐ': { masu: 'ぎます', nai: 'がない', te: 'いで', ta: 'いだ' },
  'ぶ': { masu: 'びます', nai: 'ばない', te: 'んで', ta: 'んだ' },
  'む': { masu: 'みます', nai: 'まない', te: 'んで', ta: 'んだ' },
  'ぬ': { masu: 'にます', nai: 'なない', te: 'んで', ta: 'んだ' },
  'す': { masu: 'します', nai: 'さない', te: 'して', ta: 'した' },
}

export function convertForms(dictForm, verbType) {
  if (verbType === "1") {
    const part = dictForm.slice(-1);          // "のむ" => "む"
    const sliced = dictForm.slice(0, -1);     // "のむ" => "の"
    return [
      sliced + convertedPart[part].masu,
      sliced + convertedPart[part].te,
      sliced + convertedPart[part].ta,
      sliced + convertedPart[part].nai,
    ]
  } else if (verbType === "2") {
    const sliced = dictForm.slice(0, -1);     // "たべる" => "たべ"
    return [
      sliced + "ます",
      sliced + "て",
      sliced + "た",
      sliced + "ない",
    ]
  } else {
    alert("Chỉ hỗ trợ verb loại 1 hoặc 2");
  }
}
