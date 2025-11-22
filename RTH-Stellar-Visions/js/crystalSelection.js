function initCrystalSelection() {
    const div = document.getElementById('crystal-selection');
    div.innerHTML = `
      <h3>Select Crystal Shape</h3>
      <select id="crystalShape">
        <option>Rectangle</option>
        <option>Cube</option>
        <option>Sphere</option>
      </select>
      <h3>Add-ons</h3>
      <input type="checkbox" id="ledBase"/> LED Base
      <input type="checkbox" id="engraving"/> Engraving
      <input type="checkbox" id="giftBox"/> Gift Box
    `;
}

export { initCrystalSelection };
