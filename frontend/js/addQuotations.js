
    /* ──────────────────────────────────────────
       VENDOR DATA
    ────────────────────────────────────────── */
    const VENDORS = [
      { id:1, name:'ABC Traders',   initials:'AT', color:'#4361ee', bg:'rgba(67,97,238,0.12)',    status:'active',   selected:true  },
      { id:2, name:'Tech Solutions',initials:'TS', color:'#10b981', bg:'rgba(16,185,129,0.12)',   status:'active',   selected:true  },
      { id:3, name:'Global Systems',initials:'GS', color:'#f59e0b', bg:'rgba(245,158,11,0.12)',   status:'active',   selected:true  },
      { id:4, name:'Smart Supplies',initials:'SS', color:'#8b5cf6', bg:'rgba(139,92,246,0.12)',   status:'inactive', selected:false },
      { id:5, name:'Future Tech',   initials:'FT', color:'#ef4444', bg:'rgba(239,68,68,0.12)',    status:'active',   selected:false },
    ];
 
    /* ──────────────────────────────────────────
       RENDER VENDOR LIST
    ────────────────────────────────────────── */
    function renderVendors(list) {
      const container = document.getElementById('vendorList');
      container.innerHTML = '';
 
      if (!list.length) {
        container.innerHTML = `
          <div class="no-vendors">
            <i class="fas fa-store-slash"></i>
            No vendors found.
          </div>`;
        updateBadge();
        return;
      }
 
      list.forEach(v => {
        const div = document.createElement('div');
        div.className = 'vendor-row' + (v.selected ? ' is-selected' : '');
        div.dataset.id = v.id;
        div.onclick = () => toggleVendor(v.id);
 
        div.innerHTML = `
          <div class="vcheck"><i class="fas fa-check"></i></div>
          <div class="vavatar" style="background:${v.bg};color:${v.color};">${v.initials}</div>
          <span class="vname">${v.name}</span>
          <span class="vbadge ${v.status}">${capitalize(v.status)}</span>
        `;
 
        container.appendChild(div);
      });
 
      updateBadge();
    }
 
    /* ──────────────────────────────────────────
       TOGGLE
    ────────────────────────────────────────── */
    function toggleVendor(id) {
      const v = VENDORS.find(x => x.id === id);
      if (v) {
        v.selected = !v.selected;
        const query = document.getElementById('vendorSearch').value;
        filterVendors(query);
 
        // Clear vendor error
        document.getElementById('err-vendors').style.display = 'none';
      }
    }
 
    /* ──────────────────────────────────────────
       FILTER
    ────────────────────────────────────────── */
    function filterVendors(q) {
      const filtered = VENDORS.filter(v =>
        v.name.toLowerCase().includes(q.toLowerCase())
      );
      renderVendors(filtered);
    }
 
    /* ──────────────────────────────────────────
       BADGE
    ────────────────────────────────────────── */
    function updateBadge() {
      const count = VENDORS.filter(v => v.selected).length;
      const badge = document.getElementById('selBadge');
      const num   = document.getElementById('selCount');
 
      if (count > 0) {
        badge.style.display = 'inline-flex';
        num.textContent = count;
      } else {
        badge.style.display = 'none';
      }
    }
 
    /* ──────────────────────────────────────────
       VALIDATION & SUBMIT
    ────────────────────────────────────────── */
    function handleCreate() {
      const title    = document.getElementById('qTitle');
      const desc     = document.getElementById('qDesc');
      const selected = VENDORS.filter(v => v.selected);
 
      let valid = true;
 
      if (!title.value.trim()) {
        showFieldErr(title, 'err-title');
        valid = false;
      }
 
      if (!desc.value.trim()) {
        showFieldErr(desc, 'err-desc');
        valid = false;
      }
 
      if (selected.length === 0) {
        document.getElementById('err-vendors').style.display = 'flex';
        valid = false;
      }
 
      if (!valid) return;
 
      /* ✅ Success */
      showToast(
        'success',
        'Quotation Created!',
        `"${title.value.trim()}" assigned to ${selected.map(v => v.name).join(', ')}.`
      );
 
      /* Reset */
      title.value = '';
      desc.value  = '';
      document.getElementById('qDate').value = '';
      VENDORS.forEach(v => v.selected = false);
      document.getElementById('vendorSearch').value = '';
      renderVendors(VENDORS);
    }
 
    function handleCancel() {
      if (!document.getElementById('qTitle').value.trim() &&
          !document.getElementById('qDesc').value.trim() &&
          VENDORS.every(v => !v.selected)) return;
 
      document.getElementById('qTitle').value = '';
      document.getElementById('qDesc').value  = '';
      document.getElementById('qDate').value  = '';
      document.getElementById('vendorSearch').value = '';
      VENDORS.forEach(v => v.selected = false);
      renderVendors(VENDORS);
      showToast('error', 'Cancelled', 'All changes have been discarded.');
    }
 
    function showFieldErr(el, errId) {
      el.classList.add('has-error');
      document.getElementById(errId).style.display = 'flex';
    }
 
    function clearError(el) {
      el.classList.remove('has-error');
      const map = { 'qTitle':'err-title', 'qDesc':'err-desc' };
      if (map[el.id]) document.getElementById(map[el.id]).style.display = 'none';
    }
 
    /* ──────────────────────────────────────────
       TOAST
    ────────────────────────────────────────── */
    function showToast(type, title, sub) {
      const wrap  = document.getElementById('toastWrap');
      const toast = document.createElement('div');
      toast.className = `toast-msg ${type}`;
 
      const icon = type === 'success'
        ? '<i class="fas fa-circle-check"></i>'
        : '<i class="fas fa-circle-xmark"></i>';
 
      toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-body">
          <div class="toast-head">${title}</div>
          <div class="toast-sub">${sub}</div>
        </div>
        <button class="toast-close" onclick="this.closest('.toast-msg').remove()">
          <i class="fas fa-xmark"></i>
        </button>
      `;
 
      wrap.appendChild(toast);
 
      setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }
 
    /* ──────────────────────────────────────────
       SIDEBAR TOGGLE
    ────────────────────────────────────────── */
    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('show');
    }
 
    function closeSidebar() {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('show');
    }
 
    /* ──────────────────────────────────────────
       HELPERS
    ────────────────────────────────────────── */
    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
 
    /* ──────────────────────────────────────────
       INIT
    ────────────────────────────────────────── */
    renderVendors(VENDORS);
  