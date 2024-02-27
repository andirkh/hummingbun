export const convertMdToHtml = (markdown: string): string => {
  // Replace headers
  markdown = markdown
    .replace(/^# (.+?)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+?)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+?)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+?)$/gm, '<h4>$1</h4>')
    .replace(/^##### (.+?)$/gm, '<h5>$1</h5>')
    .replace(/^###### (.+?)$/gm, '<h6>$1</h6>');

  // Replace block
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Replace italic
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Replace strike through
  markdown = markdown.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Replace blockquotes
  markdown = markdown.replace(/^>(.*)$/gm, '<blockquote>$1</blockquote>\n');

  // Replace horizontal rules
  markdown = markdown.replace(/^---$/gm, '<hr>\n');

  // Replace unordered lists
  markdown = markdown.replace(/^-(.*)$/gm, '<li>$1</li>');

  // Replace ordered lists
  markdown = markdown.replace(/^(\d+\.\s+.+\n)+/gm, (match) => {
    return (
      '<ol>' + match.replace(/^\d+\.\s+(.+)\n/gm, '<li>$1</li>') + '</ol>\n'
    );
  });

  // Convert code blocks
  markdown = markdown.replace(/```([\s\S]*?)```/g, function (match, code) {
    // add support for programming language detection. code.trim().split('\n')[0]
    return '<pre><code>' + code.trim() + '</code></pre>';
  });

  markdown = markdown.replace(/`([^`]+)`/g, function (match, code) {
    return '<code>' + code + '</code>';
  });

  // Replace images
  markdown = markdown.replace(
    /!\[([^\]]+)\]\(([^)]+)\)/g,
    '<img alt="$1" src="$2">',
  );

  // Replace links
  markdown = markdown.replace(/\[(.+?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Replace paragraphs
  markdown = markdown.replace(/^\s*([^<\n].*?)\n/gm, '<p>$1</p>\n');

  return markdown;
};
