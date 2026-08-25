/**
 * Pol Language Academy - Telegram Integration & Quick Order System
 * Pure Vanilla JS - Zero dependencies, Cloudflare Pages Ready
 */

const TELEGRAM_CONFIG = {
  botUsername: 'PolLanguageAcademy_Bot',
  channelUsername: 'PolLanguageAcademy',
  supportUsername: 'PolAcademy_Support',
  phoneNumber: '+982188880000',
  defaultMessage: 'سلام، مایل به دریافت مشاوره رایگان و ثبت‌نام در دوره‌های آکادمی زبان پل هستم.'
};

/**
 * Creates a formatted Telegram link
 * @param {string} text - Message body
 * @returns {string} - Formatted Telegram URL
 */
function getTelegramUrl(text = TELEGRAM_CONFIG.defaultMessage) {
  const encodedText = encodeURIComponent(text);
  return `https://t.me/${TELEGRAM_CONFIG.supportUsername}?text=${encodedText}`;
}

/**
 * Open Telegram chat with prefilled message
 * @param {string} text 
 */
function openTelegramChat(text) {
  const url = getTelegramUrl(text);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Order a course directly via Telegram
 * @param {Object} courseData 
 */
function orderCourseViaTelegram(courseData) {
  const message = `🎓 *درخواست ثبت‌نام در دوره آموزشی آکادمی پل*
━━━━━━━━━━━━━━━
📚 *عنوان دوره:* ${courseData.title || 'دوره تخصصی زبان'}
📊 *سطح:* ${courseData.level || 'متوسط'}
⏱️ *مدت دوره:* ${courseData.duration || '۳ ماه'}
💰 *شهریه:* ${courseData.price || 'تماس بگیرید'}
━━━━━━━━━━━━━━━
👤 *نام متقاضی:* ${courseData.userName || 'کاربر وب‌سایت'}
📞 *شماره تماس:* ${courseData.phone || 'ثبت نشده'}
💬 *پیام/یادداشت:* ${courseData.notes || 'لطفاً جهت هماهنگی کلاس‌ها و آزمون تعیین سطح با من تماس بگیرید.'}`;

  openTelegramChat(message);
}

/**
 * Initialize Quick Consultation Modal
 */
function initConsultationModal() {
  const modalHTML = `
    <div id="consultation-modal" class="fixed inset-0 z-50 flex items-center justify-center hidden p-4">
      <div class="modal-backdrop fixed inset-0" onclick="closeConsultationModal()"></div>
      <div class="modal-content relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 animate-fade-in border border-gray-100">
        <div class="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
          <h3 class="text-xl font-bold text-[#052656] flex items-center gap-2">
            <span class="material-symbols-outlined text-[#fd9923]">support_agent</span>
            مشاوره رایگان و ثبت‌نام سریع
          </h3>
          <button onclick="closeConsultationModal()" class="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <form id="quick-consult-form" onsubmit="handleQuickConsultSubmit(event)" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">نام و نام خانوادگی</label>
            <input type="text" id="consult-name" required placeholder="مثال: علی رضایی" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#052656] focus:border-transparent outline-none text-sm">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">شماره تماس (همراه)</label>
            <input type="tel" id="consult-phone" required dir="ltr" placeholder="0912 345 6789" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#052656] focus:border-transparent outline-none text-sm text-left">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">زبان مورد علاقه</label>
            <select id="consult-lang" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#052656] focus:border-transparent outline-none text-sm">
              <option value="انگلیسی">زبان انگلیسی</option>
              <option value="آلمانی">زبان آلمانی</option>
              <option value="فرانسه">زبان فرانسه</option>
              <option value="ترکی استانبولی">ترکی استانبولی</option>
              <option value="سایر">سایر زبان‌ها</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">توضیحات تکمیلی (اختیاری)</label>
            <textarea id="consult-notes" rows="2" placeholder="هدف یادگیری، روزهای پیشنهادی یا سطح فعلی..." class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#052656] focus:border-transparent outline-none text-sm"></textarea>
          </div>
          <div class="pt-2 flex gap-3">
            <button type="submit" class="flex-1 bg-[#fd9923] hover:bg-[#F7941D] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-lg">send</span>
              ارسال درخواست در تلگرام
            </button>
            <button type="button" onclick="closeConsultationModal()" class="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition">
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  if (!document.getElementById('consultation-modal')) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}

function openConsultationModal(courseTitle = '') {
  initConsultationModal();
  const modal = document.getElementById('consultation-modal');
  if (modal) {
    if (courseTitle) {
      const notes = document.getElementById('consult-notes');
      if (notes) notes.value = `علاقه‌مند به دوره: ${courseTitle}`;
    }
    modal.classList.remove('hidden');
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  if (modal) modal.classList.add('hidden');
}

function handleQuickConsultSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('consult-name')?.value || '';
  const phone = document.getElementById('consult-phone')?.value || '';
  const lang = document.getElementById('consult-lang')?.value || '';
  const notes = document.getElementById('consult-notes')?.value || '';

  const message = `📋 *درخواست مشاوره رایگان آموزشگاه زبان پل*
━━━━━━━━━━━━━━━
👤 *نام:* ${name}
📞 *شماره تماس:* ${phone}
🌐 *زبان انتخابی:* ${lang}
📝 *توضیحات:* ${notes || 'درخواست تعیین سطح و مشاوره تلفنی/حضوری'}
━━━━━━━━━━━━━━━
_ارسال شده از طریق وب‌سایت آکادمی زبان پل_`;

  closeConsultationModal();
  openTelegramChat(message);
}

// Auto inject floating Telegram support badge on all pages
document.addEventListener('DOMContentLoaded', () => {
  initConsultationModal();
  
  const floatingBtn = `
    <div class="floating-telegram">
      <button onclick="openConsultationModal()" title="مشاوره آنلاین در تلگرام" class="flex items-center gap-2 bg-[#24A45A] hover:bg-[#1e8a4a] text-white px-4 py-3 rounded-full font-bold shadow-lg transition-all text-sm">
        <span class="material-symbols-outlined text-xl">forum</span>
        <span class="hidden sm:inline">مشاوره تلگرامی</span>
      </button>
    </div>
  `;
  
  if (!document.querySelector('.floating-telegram')) {
    document.body.insertAdjacentHTML('beforeend', floatingBtn);
  }
});
