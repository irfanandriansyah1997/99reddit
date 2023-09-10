export const decodeHTMLEntities = (text) => {
  const entities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: "\xa0",
    quot: '"',
  };
  const entityPattern = /&([a-z]+);/gi;

  return text
    .replace(entityPattern, function (match, entity) {
      entity = entity.toLowerCase();

      if (entities.hasOwnProperty(entity)) {
        return entities[entity];
      }

      return match;
    })
    .replace(/\\/g, "");
};
