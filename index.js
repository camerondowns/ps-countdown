const target_date = new Date("August 24, 2024 00:00:00").getTime();

class Clock {
    constructor() {
        const slots = document.querySelectorAll('.slot');
        this.slots = [];
        for (let i = 0; i < slots.length; i++) {
            const slot = slots[i].getElementsByTagName('span');
            for (let j = 0; j < slot.length; j++) {
                const element = slot[j];
                this.slots.push(element);
            }
        }
        this.tick();
    }

    getTimestring() {
        const time = new Date().getTime();
        let totalSecondsLeft = (target_date - time) / 1000;
        if (totalSecondsLeft <= 0) return '000000000';

        const days = parseInt(totalSecondsLeft / 86400);
        totalSecondsLeft = totalSecondsLeft % 86400;

        const hours = parseInt(totalSecondsLeft / 3600);
        totalSecondsLeft = totalSecondsLeft % 3600;

        const minutes = parseInt(totalSecondsLeft / 60);
        totalSecondsLeft = totalSecondsLeft % 60;

        const seconds = parseInt(totalSecondsLeft);
        const timestring = (this.pad(days.toString().padStart(3, '0')) + this.pad(hours.toString().padStart(2, '0')) + this.pad(minutes.toString().padStart(2, '0')) + this.pad(seconds.toString().padStart(2, '0')));
        return timestring;
    }

    tick() {
        this.update(this.getTimestring());
        if (!this.getTimestring()) return;
        setTimeout(() => {
            this.tick();
        }, 500);
    }

    update(timeString) {
        let value, slot, now;
        for (let i = 0; i < this.slots.length; i++) {
            value = timeString.charAt(i);
            slot = this.slots[i];
            now = slot.getAttribute("data-now");

            if (now === null) {
                slot.setAttribute("data-now", value);
                slot.setAttribute("data-old", value);
                continue;
            }
            if (now === value) continue;
            this.flip(slot, value);
        }
    }

    pad(value) {
        return value.padStart(2, '0');
    }

    flip(slot, value) {
        slot.classList.remove('flip');
        slot.setAttribute("data-old", slot.getAttribute("data-now"));
        slot.setAttribute("data-now", value);
        slot.classList.add('flip');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Clock()
});