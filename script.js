console.log('Akwadra Chat System Initialized');

// --- Mock Data ---
const rooms = [
    { id: 1, name: "لمة أحباب ❤️", host: "أحمد", viewers: 120, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" },
    { id: 2, name: "سوالف ليل 🌙", host: "سارة", viewers: 85, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
    { id: 3, name: "مسابقات وجوائز 🎁", host: "Admin", viewers: 340, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" },
    { id: 4, name: "شعر وقصائد", host: "شاعر", viewers: 45, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Poet" },
    { id: 5, name: "Pubg Mobile 🎮", host: "Gamer", viewers: 210, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gamer" },
    { id: 6, name: "تلاوات خاشعة", host: "الشيخ", viewers: 500, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sheikh" },
];

const agencies = [
    { name: "الملوك", level: 5, income: "500K", image: "👑" },
    { name: "الصقور", level: 4, income: "320K", image: "🦅" },
    { name: "القمر", level: 4, income: "280K", image: "🌑" },
    { name: "VIP", level: 3, income: "150K", image: "💎" },
];

const inventory = [
    { id: 1, name: "إطار قوس قزح", type: "frame", class: "frame-rainbow", icon: "🌈" },
    { id: 2, name: "إطار ذهبي", type: "frame", class: "frame-gold", icon: "🥇" },
    { id: 3, name: "سيارة رياضية", type: "car", icon: "🏎️" },
    { id: 4, name: "طائرة خاصة", type: "car", icon: "✈️" },
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderRooms();
    renderAgencies();
    renderInventory();
    renderStoreFrames();
});

// --- Navigation Logic ---
function navigateTo(screenName) {
    // Hide all screens
    const screens = ['home', 'agency', 'store', 'bag'];
    screens.forEach(s => {
        document.getElementById(`screen-${s}`).classList.add('hidden');
    });
    
    // Show target screen
    document.getElementById(`screen-${screenName}`).classList.remove('hidden');

    // Update Nav Icons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Simple logic to highlight nav button based on index (imperfect but works for demo)
    const map = { 'home': 0, 'agency': 1, 'store': 3, 'bag': 4 };
    if(map[screenName] !== undefined) {
        navBtns[map[screenName]].classList.add('active');
    }
}

// --- Rendering Functions ---
function renderRooms() {
    const container = document.getElementById('rooms-container');
    container.innerHTML = '';
    rooms.forEach(room => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-xl p-3 shadow-md hover:scale-95 transition cursor-pointer relative overflow-hidden group';
        card.onclick = () => enterRoom(room);
        card.innerHTML = `
            <div class="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <i class="fas fa-headphones"></i> ${room.viewers}
            </div>
            <div class="flex flex-col items-center mt-2">
                <div class="w-16 h-16 rounded-full border-2 border-purple-500 p-0.5 mb-2">
                    <img src="${room.image}" class="w-full h-full rounded-full bg-gray-700">
                </div>
                <h3 class="font-bold text-sm text-center truncate w-full">${room.name}</h3>
                <p class="text-xs text-gray-400">${room.host}</p>
            </div>
            <div class="mt-3 flex justify-center">
                <span class="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">ترفيه</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderAgencies() {
    const container = document.getElementById('agencies-list');
    container.innerHTML = '';
    agencies.forEach((agency, index) => {
        container.innerHTML += `
            <div class="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                <div class="flex items-center gap-3">
                    <span class="text-lg font-bold w-6 text-center ${index < 3 ? 'text-yellow-400' : 'text-gray-400'}">${index + 1}</span>
                    <div class="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-xl">${agency.image}</div>
                    <div>
                        <h4 class="font-bold text-sm">${agency.name}</h4>
                        <span class="text-xs text-blue-400">Lv. ${agency.level}</span>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-400">الدخل (BD)</p>
                    <p class="text-sm font-bold text-yellow-500">${agency.income}</p>
                </div>
            </div>
        `;
    });
}

function renderInventory() {
    const container = document.getElementById('inventory-grid');
    container.innerHTML = '';
    inventory.forEach(item => {
        container.innerHTML += `
            <div class="bg-gray-800 p-2 rounded-lg flex flex-col items-center gap-2 border border-gray-700 cursor-pointer hover:border-purple-500" onclick="equipItem('${item.class}')">
                <div class="w-12 h-12 flex items-center justify-center text-3xl bg-gray-700/50 rounded-full">
                    ${item.icon}
                </div>
                <span class="text-xs">${item.name}</span>
                <button class="text-[10px] bg-gray-700 px-2 py-0.5 rounded text-gray-300">تفعيل</button>
            </div>
        `;
    });
}

function renderStoreFrames() {
    const container = document.getElementById('frames-store');
    const frames = [
        {name: "نيون أزرق", price: 500, icon: "🔵"},
        {name: "حب", price: 1200, icon: "❤️"},
        {name: "ملكي", price: 5000, icon: "👑"},
    ];
    container.innerHTML = '';
    frames.forEach(f => {
        container.innerHTML += `
            <div class="bg-gray-800 p-2 rounded-lg flex flex-col items-center gap-1 border border-gray-700">
                <div class="text-2xl">${f.icon}</div>
                <span class="text-xs">${f.name}</span>
                <button class="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded font-bold">${f.price} 🪙</button>
            </div>
        `;
    })
}

// --- Room Logic ---
function enterRoom(room) {
    const overlay = document.getElementById('room-overlay');
    overlay.classList.remove('hidden');
    // Slight delay to allow display:block to apply before transition
    setTimeout(() => {
        overlay.classList.remove('translate-y-full');
        overlay.classList.add('translate-y-0');
    }, 10);
    
    // Add entrance message
    addChatMessage(`دخل <span class="text-blue-400">المستخدم الذهبي</span> الغرفة`, true);
}

function exitRoom() {
    const overlay = document.getElementById('room-overlay');
    overlay.classList.remove('translate-y-0');
    overlay.classList.add('translate-y-full');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 300);
}

function addChatMessage(msg, isSystem = false) {
    const chat = document.getElementById('room-chat');
    const msgDiv = document.createElement('div');
    
    if (isSystem) {
        msgDiv.className = "bg-purple-500/20 self-center px-3 py-1 rounded-full text-xs text-purple-200 my-1";
        msgDiv.innerHTML = msg;
    } else {
        msgDiv.className = "bg-gray-700/50 self-start px-3 py-1.5 rounded-lg text-sm max-w-[80%]";
        msgDiv.innerHTML = `<span class="text-yellow-500 font-bold text-xs block mb-0.5">أنت:</span> ${msg}`;
    }
    
    chat.insertBefore(msgDiv, chat.firstChild);
}

function sendGift() {
    addChatMessage(`أرسل <span class="text-pink-400 font-bold">وردة 🌹</span> للمضيف!`, true);
    // Animate coins deduction visually
    const coinDisplay = document.getElementById('user-coins');
    let current = parseInt(coinDisplay.innerText);
    if(current >= 10) {
        coinDisplay.innerText = current - 10;
    } else {
        alert('لا تملك رصيد كافي!');
    }
}

// --- Item Logic ---
function equipItem(className) {
    if(!className) return;
    const avatarFrame = document.getElementById('header-avatar-frame');
    // Remove old classes
    avatarFrame.className = "w-10 h-10 rounded-full p-[2px] relative";
    // Add new class
    avatarFrame.classList.add(className);
    alert('تم تفعيل الإطار بنجاح!');
}