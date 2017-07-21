/**
 * Created by Reza on 7/20/2017.
 */

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Node.prototype.removeAllChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
};