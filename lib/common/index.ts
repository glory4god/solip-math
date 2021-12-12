export function mongoDateFormatting(date: Date) {
  const year = date.toString().split('-')[0];
  const month = date.toString().split('-')[1];
  const day = date.toString().split('-')[2].substr(0, 2);
  return `${year}-${month}-${day}`;
}

export function stringToHTMLFormatting(str: string) {
  return {
    __html: str
      .split('\n')
      .map((content: string, idx) => {
        return `<span key={${idx}}>
          ${content}
          <br />
        </span>`;
      })
      .join(''),
  };
}
