export const changeColororOnValue = (value:number) => {
 return value<0?{ color: 'red'}:{ color: 'green'}
}
export const dateToLocalTime = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString()
}