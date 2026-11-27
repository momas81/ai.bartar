
async function loadSiteContent() {
  try {
    const response = await fetch('./content/site.json');

    if (!response.ok) {
      throw new Error('خطا در دریافت محتوای سایت');
    }

    const data = await response.json();

    document.querySelectorAll('[data-content]').forEach(element => {
      const key = element.getAttribute('data-content');
      const value = key.split('.').reduce((obj, part) => obj?.[part], data);

      if (value !== undefined && value !== null) {
        element.textContent = value;
      }
    });

    document.querySelectorAll('[data-content-html]').forEach(element => {
      const key = element.getAttribute('data-content-html');
      const value = key.split('.').reduce((obj, part) => obj?.[part], data);

      if (typeof value === 'string') {
        element.textContent = value;
      }
    });

    document.querySelectorAll('[data-contact-phone]').forEach(element => {
      element.textContent = data.phone || '';
      element.href = 'tel:' + (data.phone || '');
    });

    document.querySelectorAll('[data-contact-eitaa]').forEach(element => {
      element.href = data.eitaa || '#';
    });

    document.querySelectorAll('[data-brand]').forEach(element => {
      element.textContent = data.brand || '';
    });

    console.log('محتوای مدرسه هوش برتر بارگذاری شد.');
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadSiteContent);
