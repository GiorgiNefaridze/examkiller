type CutTextType = (content: string, cutIdx: number) => string;

const cutText: CutTextType = (content, cutIdx) => {
  return content?.length > cutIdx ? content.slice(0, cutIdx) + "..." : content;
};

export { cutText };
