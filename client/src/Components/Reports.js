import React, { Component } from 'react';

const keyValue = {
    giangDuong: "Giảng đường đáp ứng yêu cầu của môn học",
    trangThietBi: "Các trang thiết bị của giảng đường đáp ứng yêu cầu giảng dạy và học tập",
    hoTroKipThoi: "Bạn được hỗ trợ kịp thời trong quá trình học môn này",
    mucTieuMonHoc: "Mục tiêu của môn học nêu rõ kiến thức và kỹ năng người học cần đạt được",
    thoiLuongMonHoc: "Thời lượng môn học được phân bổ hợp lí cho các hình thức học tập",
    taiLieu: "Các tài liệu phục vụ môn học được cập nhật",
    trangBiKienThuc: "Môn học góp phần trang bị kiến thức kĩ năng nghề nghiệp cho bạn",
    giangVienThucHienDayDu: "Giảng viên thực hiện đầy đủ nội dung và thời lượng của môn học theo kế hoạch",
    giangVienHuongDanBatDauMonHoc: "Giảng viên hướng dẫn bạn phương pháp học tập khi bắt đầu môn học",
    phuongPhapGiangDay: "Phương pháp giảng dạy của giảng viên giúp bạn phát triển tư duy",
    giangVienTaoCoHoi: "Giảng viên tạo cơ hội để bạn chủ động tham gia vào quá trình học tập",
    giangVienGiupDocLap: "Giảng viên giúp bạn phát triển kĩ năng làm việc độc lập",
    giangVienThucTien: "Giảng viên rèn luyện cho bạn phương pháp liên hệ giữa các vấn đề trong môn học với thực tiễn",
    giangVienSuDungCongCu: "Giảng viên sử dụng hiệu quả phương tiện dạy học",
    giangVienGiaoDucTuCachNguoiHoc: "Giảng viên quan tâm giáo dục tư cách, phẩm chất nghề nghiệp của người học",
    hieuBai: "Bạn hiểu những vấn đề được truyền tải trên lớp",
    cachDanhGia: "Kết quả học tập của người học được đánh giá bằng nhiều hình thức phù hợp với tính chất và đặc thù môn học",
    noiDungDanhGia: "Nội dung kiểm tra đánh giá tổng hợp được các kĩ năng mà người học phải đạt theo yêu cầu",
    tacDungThongTinPhanHoi: "Thông tin phản hồi từ kiểm tra đánh giá giúp bạn cải thiện kết quả học tập",
};

const headerTable = (
    <thead>
        <tr>
            <th className="col-lg-9"></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
        </tr>
    </thead>
);

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: "",
            class_id: "",
            subject_id: "",
            className: "",
            // listSurveys: createListSurveys(),
            giangDuong: null,
            trangThietBi: null,
            hoTroKipThoi: null,
            mucTieuMonHoc: null,
            thoiLuongMonHoc: null,
            taiLieu: null,
            trangBiKienThuc: null,
            giangVienThucHienDayDu: null,
            giangVienHuongDanBatDauMonHoc: null,
            phuongPhapGiangDay: null,
            giangVienTaoCoHoi: null,
            giangVienGiupDocLap: null,
            giangVienThucTien: null,
            giangVienSuDungCongCu: null,
            giangVienGiaoDucTuCachNguoiHoc: null,
            hieuBai: null,
            cachDanhGia: null,
            noiDungDanhGia: null,
            tacDungThongTinPhanHoi: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange() {
        // let target = event.target;
        // let value = target.value;
        // let name = target.name;

        // this.setState({
        //     [name]: value
        // });
        // console.log(this.state.slice('giangDuong'));
        console.log(this.state);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        let listSurveys = Object.getOwnPropertyNames(this.state).slice(4).map(survey => 
            <tr key={survey}>
                <td>{keyValue[survey]}</td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={1}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "1"}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={2}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "2"}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={3}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "3"}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={4}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "4"}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={5}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "5"}
                    />
                </td>
            </tr>
        );
        return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading text-center">
                                <h4>Toán rời rạc INT1003 1</h4>
                            </div>

                            <div className="panel-body">
                                <p>1.* Cơ sở vật chất</p>
                                <table className="table">
                                    {headerTable}
                                    <tbody>
                                        {listSurveys.slice(0, 2)}
                                    </tbody>
                                </table>
                                
                                <p>2.* Môn học</p>
                                <table className="table">
                                    {headerTable}
                                    <tbody>
                                        {listSurveys.slice(2, 7)}
                                    </tbody>
                                </table>

                                <p>3.* Hoạt động giảng dạy của giảng viên</p>
                                <table className="table">
                                    {headerTable}
                                    <tbody>
                                        {listSurveys.slice(7)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.handleInputChange}>xxx</button>
                </div>
        );
    }
}

export default Reports;