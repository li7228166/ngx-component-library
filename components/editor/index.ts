import {Component, ElementRef, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import 'bootstrap';
import 'summernote';
import 'summernote/lang/summernote-zh-CN.js'
import {FileService} from "@app/services/file";

declare const $: any;

@Component({
    selector: 'editor',
    templateUrl: './template.html',
    styleUrls: ['./style.less'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EditorComponent),
        multi: true
    }]
})
export class EditorComponent implements OnInit, OnDestroy {
    onValueChange: any;
    value: any;
    element: any;
    editor: any;

    constructor(public el: ElementRef, public fileService: FileService) {
        this.element = $(el.nativeElement);
    }

    ngOnInit(): void {
        const self = this;
        this.editor = this.element.find('.editor');
        this.editor.summernote({
            lang: 'zh-CN',
            height: 400,
            callbacks: {
                onChange: function (contents, $editable) {
                    self.onValueChange && self.onValueChange(contents);
                },
                onImageUpload: function (files, editor, $editable) {
                    self.fileService.fileUpload(files[0]).then((data: any) => {
                        self.editor.summernote('insertImage', data.image, function ($image) {
                            $image.css('max-width', '100%');
                        });
                    })
                }
            }
        });
    }

    writeValue(value: any): void {
        this.value = value;
        this.editor.summernote('code', value);
    }

    registerOnChange(changeFn: any): void {
        this.onValueChange = changeFn;
    }

    registerOnTouched(changeFn: any): void {
    }

    ngOnDestroy(): void {
        this.editor.summernote('destroy');
    }
}