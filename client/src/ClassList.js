import React, { Component } from 'react';
import ClassCard from './ClassCard'

class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClass: [],
        }
    }
    
    render() {
        let list = [
            {
                classId: 1,
                className: "Phát triển ứng dụng Web",
                totalStudent: 50,
                isComplete: true,
            },
            {
                classId: 2,
                className: "Kho dữ liệu",
                totalStudent: 100,
                isComplete: false,
            },
            {
                classId: 3,
                className: "Thiết kế giao diện người dùng",
                totalStudent: 140,
                isComplete: false,
            },
            {
                classId: 4,
                className: "Trí tuệ nhân tạo",
                totalStudent: 30,
                isComplete: true,
            },
        ];

        return (
            <div className="row">
                {
                    list.map((item, index) =>
                    <ClassCard 
                        key = {item.classId}
                        classId={item.classId}
                        className={item.className}
                        totalStudent={item.totalStudent}
                        isComplete={item.isComplete}
                    />)
                }
            </div>
        );
    }
}

export default ClassList;
