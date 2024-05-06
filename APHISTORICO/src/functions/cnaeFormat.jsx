export function cnaeFormat(cnae) {
  var Ncnae = String(cnae);
  return Ncnae.slice(0, 5) + "-" + Ncnae.slice(5);
}
