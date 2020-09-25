
export function createHeader(state) {
  const removeMeta = `data-type="remove"`;
  const exitMeta = `data-type="exit"`;
  return `
    <input type="text" class="input" value="${state.title}">
              
      <div>

          <div class="button" ${removeMeta}>
              <i class="material-icons" ${removeMeta}>delete_outline</i>
          </div>

          <div class="button" ${exitMeta}>
              <i class="material-icons" ${exitMeta}>exit_to_app</i>
          </div>

      </div>
    `;
}
