const card = (title: string, link: string, content: string): string => {
  return String.raw`
    <div>
      <a href="${link}">${title}</a>
      <p>${content}</p>
    </div>
    `;
};

export default card;
