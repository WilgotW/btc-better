export default function checkStatus(status: number) {
  if (status === 401) {
    //unauthorized
    console.log("unauthorized");
    return false;
  }
  return true;
}
