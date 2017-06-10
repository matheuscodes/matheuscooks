export default function getLanguage(){
  return (
    navigator.language ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    navigator.userLanguage || 'en').substring(0,2);
}
