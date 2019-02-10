export class FormErrors {
    private badRequestHttpStatusCode = 400;
    errors: any[];

    constructor(errors: any[]) {
        this.errors = errors ? errors : [];
    }

    static empty() {
        return new FormErrors([]);
    }

    handleSubmitError(response: any) {
        this.clear();
        if (response.status === this.badRequestHttpStatusCode) {
            this.errors = response.error.errors;
        }
    }

    clear() {
        this.errors = [];
    }

    clearBy(key: string) {
        this.errors = this.errors.filter((item) => item.key !== key);
    }
}
