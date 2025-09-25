// ==================================================================
// Transform an array of items by selecting specific fields and adding a link
// ==================================================================
const getTransformedItems = ({ items = [], selection = [], path = "/" }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error("Invalid section");
  }

  if (selection.length === 0) {
    return items.map((item) => ({ ...items, link: `${path}/${item.id}` }));
  }

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item.id}`;
    return result;
  });
};

// ==================================================================
// Transform a single chat object with all relevant fields
// ==================================================================
const transformedChatObj = (chat) => ({
  id: chat.id,
  userId: chat.userId,
  name: chat.name,
  userName: chat.userName,
  link: chat.link,
  createdAt: chat.createdAt,
  updatedAt: chat.updatedAt,
});

module.exports = { getTransformedItems, transformedChatObj };
