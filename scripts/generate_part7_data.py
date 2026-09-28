# -*- coding: utf-8 -*-
"""
Generates the complete 54 questions for Part 7 (Q147-Q200).
"""

import json
import re
import openpyxl

wb = openpyxl.load_workbook('docs2/extracted/Session 11_ Final trial test correction (part 1)/Session 11: Final trial test correction (part 1)/Master answer sheet for final test.xlsx', data_only=True)
ws = wb['answer Key for final test']
answers = {}
for r in range(3, 28):
    for c_q, c_a in [(10, 11), (12, 13), (14, 15), (16, 17)]:
        q = ws.cell(r, c_q).value
        a = ws.cell(r, c_a).value
        if q and 147 <= int(q) <= 200:
            answers[int(q)] = a

with open('docs2/extracted/part7_all_ocr.txt') as f:
    text = f.read()

# Clean noise
text = re.sub(r'=== PAGE \d+ ===', '', text)
text = re.sub(r'TEST\s*8\s*PART\s*7\s*\d+', '', text)
text = re.sub(r'GO ON TO THE NEXT PAGE', '', text)
text = re.sub(r'Hackers[Ii]ngang\.com', '', text)

# Passage info metadata
passage_meta = [
    {
        "id": "docs2_p7_p1",
        "range": (147, 148),
        "title": "Đoạn 1 (Q147-148): Thông báo nội bộ - Khủng hoảng nước sạch tại Argenta Laboratories",
        "vn_trans": "PHÒNG THÍ NGHIỆM KHOA HỌC ARGENTA\nNgày: 27 tháng 8\nGửi: Toàn thể nhân viên\nTừ: Thomas Sutton, Quản lý cơ sở\nTiêu đề: Khủng hoảng nước\n\nNhư mọi người đã biết, tiểu bang đang ở trong tình trạng khủng hoảng nước và đã yêu cầu tất cả cư dân và doanh nghiệp thực hiện các biện pháp tiết kiệm ngay lập tức. Do đó, chúng tôi yêu cầu mọi người quản lý lượng tiêu thụ cá nhân một cách có trách nhiệm và tránh sử dụng không cần thiết, đặc biệt là trong khu vực bếp nhỏ và trong nhà vệ sinh. Hiện tại, tôi cũng đã cho tắt các vòi nước uống ở hành lang, nhưng nước đóng chai để sử dụng sẽ được cung cấp trong phòng nghỉ của nhân viên. Cảm ơn sự hợp tác của các bạn và đừng ngần ngại thông báo cho tôi nếu có bất kỳ thắc mắc hoặc câu hỏi nào."
    },
    {
        "id": "docs2_p7_p2",
        "range": (149, 150),
        "title": "Đoạn 2 (Q149-150): Thông báo di dời địa điểm - Trung tâm chuyển phát Send It Right",
        "vn_trans": "Thông báo về Địa điểm Mới\n\nKể từ ngày 31 tháng 8, trung tâm đóng gói và vận chuyển Send It Right sẽ không còn đặt tại địa điểm này nữa. Mặc dù chúng tôi rất hân hạnh được phục vụ khách hàng tại địa điểm nằm bên trong Tòa nhà Tài chính Jovan này, nhưng quy mô của chúng tôi đã vượt quá không gian hiện có. Vào ngày 1 tháng 9, bạn sẽ tìm thấy Send It Right ở bên kia Xa lộ Centerville tại TTTM Perkins Plaza, Phòng 112. Giờ làm việc bình thường từ 7 giờ sáng đến 10 giờ tối từ thứ Hai đến thứ Sáu sẽ tiếp tục vào ngày hôm đó.\nSend It Right sẽ có không gian lớn hơn nhiều được thiết kế riêng cho nhu cầu của chúng tôi, bao gồm một khu vực tự đóng gói mới dành cho những khách hàng thích mang đồ đạc và hộp từ nhà đến và tự đóng gói tại chỗ. Khách hàng cũng có thể mua các loại hộp của chúng tôi, được cung cấp với nhiều kích cỡ và hình dạng khác nhau. Chúng tôi sẽ cung cấp băng dính, kéo và bàn làm việc. Chúng tôi sẽ tiếp tục cung cấp tất cả các dịch vụ như trước đây, nhưng sẽ hỗ trợ quý khách nhanh chóng hơn vì không gian bổ sung sẽ cho phép chúng tôi thuê thêm nhân viên làm việc trong giờ cao điểm."
    },
    {
        "id": "docs2_p7_p3",
        "range": (151, 152),
        "title": "Đoạn 3 (Q151-152): Chuỗi tin nhắn - Đàm phán hợp đồng búp bê với IPD Toy Incorporated",
        "vn_trans": "Sandra Fuller [2:23]:\nCảm ơn anh một lần nữa vì đã lên kế hoạch cho chuyến thăm của khách hàng rất tốt với các đại diện từ IPD Toy Incorporated. Tôi khá ấn tượng đấy.\nBrent Cavanaugh [2:25]:\nTôi rất vui khi nghe điều đó. Họ có vẻ quan tâm đến việc đặt hàng một số dòng đồ chơi mà tôi đã mô tả trong bài thuyết trình của mình.\nSandra Fuller [2:27]:\nỒ, anh không biết sao? Sáng nay họ đã liên hệ với chúng tôi để thông báo rằng họ đã quyết định phân phối dòng Búp bê Happy Abbey của chúng ta tại tất cả các cửa hàng của họ trên toàn cầu."
    },
    {
        "id": "docs2_p7_p4",
        "range": (153, 154),
        "title": "Đoạn 4 (Q153-154): Email đặt chỗ - Đổi lịch cuộc họp và bữa trưa công ty",
        "vn_trans": "Gửi: Kay Fine <kay.fine@beebonnethall.com>\nTừ: Joe Warner <joe.warner@sammonsproductions.com>\nNgày: 17 tháng 11\nTiêu đề: Thay đổi đặt chỗ của Sammons Productions\n\nKính gửi bà Fine,\nTháng trước, tôi đã đặt cơ sở của bà để tổ chức cuộc họp nhân viên và bữa tiệc trưa sắp tới của công ty chúng tôi vào ngày 30 tháng 1. Thật không may, tôi vừa biết rằng chủ tịch của chúng tôi sẽ đi công tác nước ngoài vào ngày hôm đó. Vì vậy, tôi muốn đổi lịch sang tuần sau, nếu có thể. Lựa chọn ngày đầu tiên của tôi là ngày 5 tháng 2 vào cùng khung giờ như trước, 12 giờ trưa. Xin vui lòng thông báo cho tôi sớm nhất có thể nếu bà còn chỗ trống. Nếu không, xin vui lòng cho tôi biết những ngày nào còn trống.\nNgoài ra, bà đã cung cấp danh sách các lựa chọn thực đơn cho bữa tiệc trưa và tôi đã có thời gian xem qua. Tôi muốn chọn món gà nướng cùng với mì ống mùa xuân và salad trộn cho món chính. Đối với món tráng miệng, tôi sẽ chọn bánh pho mát anh đào của bà. Ngoài ra, tôi quên hỏi bà về các loại đồ uống được cung cấp và tôi không thấy chúng trong danh sách thực đơn. Bà có thể gửi cho tôi thông tin về các lựa chọn đồ uống này được không?"
    },
    {
        "id": "docs2_p7_p5",
        "range": (155, 157),
        "title": "Đoạn 5 (Q155-157): Hướng dẫn sử dụng - Máy tập thể dục Flextone 900",
        "vn_trans": "Flextone 900\n\nVui lòng đọc kỹ hướng dẫn sử dụng kèm theo trước khi lắp ráp sản phẩm. Hơn nữa, hãy giữ lại các hướng dẫn này để tham khảo trong tương lai. Không sử dụng sản phẩm nếu thiếu bất kỳ bộ phận nào. Liên hệ với chúng tôi theo số điện thoại được cung cấp để các bộ phận bị thiếu được chuyển đến bạn.\nTrước mỗi lần sử dụng, hãy kiểm tra xem tất cả các bộ phận đã được gắn chặt chưa. Bạn có nguy cơ bị thương tích nghiêm trọng nếu máy không được lắp ráp đúng cách. Các bộ phận có thể bị lỏng sau một thời gian dài sử dụng, vì vậy điều quan trọng là bạn phải thường xuyên kiểm tra xem mọi thứ có ổn định không và sửa chữa khi cần thiết.\nLưu ý cảnh báo:\n1. Luôn tham khảo ý kiến bác sĩ có chuyên môn trước khi thực hiện bất kỳ chương trình tập thể dục nào.\n2. Thiết bị này không dành cho trẻ em dưới 12 tuổi sử dụng.\n3. Chỉ sử dụng các bộ phận thay thế chính hãng của nhà sản xuất."
    },
    {
        "id": "docs2_p7_p6",
        "range": (158, 161),
        "title": "Đoạn 6 (Q158-161): Thảo luận nhóm trực tuyến - Điều chuyển nhân sự tại Alstrop",
        "vn_trans": "Blake Dunlap [10:28]: Chào mọi người, chúng ta cần thảo luận về kế hoạch luân chuyển nhân sự sang chi nhánh mới tại Denver.\nCathy Schultz [10:30]: Tôi nghĩ việc này sẽ giúp các nhân viên có cơ hội phát triển tốt hơn.\nBlake Dunlap [10:31]: Đúng vậy, nhưng một số người lo ngại về chi phí chuyển nhà và sinh hoạt.\nRoy Reese [10:31]: Chúng ta có gói trợ cấp chuyển vùng khá hào phóng cho các nhân viên đồng ý chuyển đi mà.\nBlake Dunlap [10:32]: Ai sẽ là người dẫn đầu nhóm kỹ thuật tại Denver?\nGeorge Kesterson [10:32]: Tôi đề xuất Daniel. Cậu ấy đã làm việc ở đây 4 năm và có chuyên môn rất vững.\nCathy Schultz [10:38]: Tôi đồng ý, cậu ấy đang cần một thử thách mới (he needs a challenge).\nBlake Dunlap [10:40]: Tốt lắm, chiều nay tôi sẽ gửi danh sách đề xuất chính thức cho ban giám đốc."
    },
    {
        "id": "docs2_p7_p7",
        "range": (162, 164),
        "title": "Đoạn 7 (Q162-164): Hóa đơn dịch vụ - Công ty vệ sinh Clean Genie gửi Vasco's Bistro",
        "vn_trans": "HÓA ĐƠN DỊCH VỤ\nClean Genie\n3102 Đại lộ Hamilton, Allentown, PA 18103\nNgày lập hóa đơn: 8 tháng 8 | Mã công việc: # C6512-2\nKhách hàng: Vasco's Bistro, 501 Phố Broad, Emmaus, PA 18049\n\nMô tả dịch vụ:\n- Kiểm tra toàn bộ cơ sở và cấp báo cáo ngày 24 tháng 7: $9.00\n- Khử trùng tất cả các bề mặt bằng dung dịch Clean Genie Surface Wash (sản phẩm độc quyền)\n- Hút bụi thảm phòng ăn chính và phủ chất bảo vệ Clean Genie Protect\n- Khử mùi và làm sạch không khí bằng Clean Genie Fresh Burst\n- Dọn dẹp rác thải và các vật dụng đánh dấu tiêu hủy\n- Kiểm tra và dọn dẹp tiếp theo vào ngày 1 tháng 8\n- Cấp chứng nhận vệ sinh đạt chuẩn phòng thí nghiệm ngày 5 tháng 8\n- Giảm giá thành viên Hiệp hội Bán lẻ Thực phẩm Quận Lehigh: -$15.00\nGhi chú: Khách hàng yêu cầu dịch vụ theo quy định bắt buộc của Phòng Vệ sinh Thực phẩm Emmaus Borough.\nTổng cộng: $105.50\nChữ ký khách hàng: Evelyn Moore, người giám sát (Quản lý tại Vasco's Bistro)"
    },
    {
        "id": "docs2_p7_p8",
        "range": (165, 167),
        "title": "Đoạn 8 (Q165-167): Email thông báo trúng giải - Cuộc thi viết du lịch của Tạp chí Alive",
        "vn_trans": "Gửi: Edward Morton\nTừ: Antonio Parrish, Chuyên viên tiếp thị Tạp chí Alive\nNgày: 2 tháng 7\nTiêu đề: Cuộc thi viết du lịch\n\nKính gửi ông Morton,\nLời chào từ Tạp chí Alive. Tôi rất vui mừng thông báo rằng bài dự thi của ông cho Cuộc thi Viết Du lịch dành cho Độc giả, 'Kỳ nghỉ cuối tuần ba ngày tại Thành phố Mexico', đã được lựa chọn để xuất bản trên số báo tháng tới. [1] Bạn sẽ tìm thấy bài viết này cùng với các bài dự thi được chọn khác trong chuyên mục du lịch định kỳ của chúng tôi. Như ông đã biết, bà Josephine Tan, người viết bài cho cẩm nang du lịch Pathways to the World, đã được mời làm giám khảo chấm tất cả các bài dự thi. Với tư cách là tác giả của bài đoạt giải nhất, tên của ông sẽ được công bố trên số báo tháng 9. Ông cũng sẽ nhận được phiếu mua hàng trị giá $500 từ bookingpros.com, áp dụng tại hơn 2.000 khách sạn và khu nghỉ dưỡng trên khắp thế giới. [2]\nTổng biên tập của chúng tôi, ông Jason Carter, cũng yêu cầu tôi hỏi xem ông có bức ảnh nào về chuyến đi của mình không. [3] Nếu có, xin vui lòng gửi chúng qua email cho chúng tôi vì chúng tôi có thể chọn in một vài bức ảnh. [4] Hình ảnh minh họa sẽ thực sự giúp câu chuyện của ông trở nên sống động."
    },
    {
        "id": "docs2_p7_p9",
        "range": (168, 171),
        "title": "Đoạn 9 (Q168-171): Bài báo âm nhạc số - Hợp tác giữa Sonorum và dịch vụ Vixo Mob",
        "vn_trans": "Sonorum Đưa Vixo Mob Tiến Gần Hơn Một Bước Đến Thực Tế\nBởi Albert Lepke, phóng viên âm nhạc\n\nÔng lớn ngành âm nhạc Sonorum, đơn vị nắm giữ bản quyền của hơn 80 hãng đĩa, đã đạt được thỏa thuận cấp phép toàn cầu với nhà cung cấp dịch vụ phát trực tuyến Vixo, mở đường cho sự ra mắt của Vixo Mob, một dịch vụ đăng ký nghe nhạc trả phí. Vixo vốn đã có quyền phát nội dung từ một số hãng đĩa lớn. [1] Nhưng cho đến nay, dịch vụ này vẫn thiếu quyền tiếp cận vào kho tàng âm nhạc đương đại khổng lồ của Sonorum.\nThỏa thuận với Sonorum sẽ làm tăng đáng kể lượng nội dung mà Vixo có thể cung cấp, giúp việc ra mắt Vixo Mob được chờ đợi từ lâu có nhiều khả năng diễn ra hơn. Dịch vụ cao cấp này đã được phát triển trong hai năm qua. [2] 'Chúng tôi rất hào hứng trước triển vọng thấy tác phẩm của các nghệ sĩ của mình tiếp cận được lượng khán giả khổng lồ của Vixo,' người phát ngôn của Sonorum cho biết. Mặc dù các đối thủ cạnh tranh như SoundStorm đã có mặt trên thị trường từ lâu, nhưng kho nhạc độc quyền đồ sộ của Sonorum sẽ đem lại lợi thế cạnh tranh áp đảo cho Vixo Mob."
    },
    {
        "id": "docs2_p7_p10",
        "range": (172, 175),
        "title": "Đoạn 10 (Q172-175): Quy định hủy chuyến và hoàn tiền - Du thuyền Open Waters Cruises",
        "vn_trans": "Chính Sách Hủy Đặt Chỗ của Open Waters Cruises\n\nDu lịch bằng tàu du thuyền đòi hỏi việc lập kế hoạch và chuẩn bị lâu dài cho cả hãng tàu lẫn hành khách. Chúng tôi nhận thấy rằng đôi khi hành khách có thể cần phải thay đổi việc đặt chỗ của mình và đã ban hành các chính sách hủy sau đây. Chúng tôi thiết lập (instituted/established) những quy định này sau khi cân nhắc các chi phí mà Open Waters Cruises phải gánh chịu cùng với nhu cầu của khách hàng.\nKhách hàng có thể gửi email đến bookings@openwaters.com hoặc gửi thư đến bộ phận đặt chỗ tại 98 Capri Boulevard, Miami, FL 33132.\nChính sách hoàn tiền:\n- Hủy trước 60 ngày trở lên so với ngày khởi hành: Hoàn lại 100% chi phí vé (trừ phí xử lý $50).\n- Hủy từ 30 đến 59 ngày trước khởi hành: Hoàn lại 50% tổng số tiền đã thanh toán.\n- Hủy dưới 30 ngày: Không hoàn lại tiền.\nLưu ý: Mọi yêu cầu hủy phòng phải được gửi bằng văn bản; chúng tôi không chấp nhận yêu cầu hủy qua điện thoại."
    },
    {
        "id": "docs2_p7_p11",
        "range": (176, 180),
        "title": "Đoạn 11 (Q176-180): Đoạn Kép: Quảng cáo áo thun in & Đơn đặt hàng của ông Okata",
        "vn_trans": "QUẢNG CÁO: SAN FRANCISCO CUSTOM T-SHIRTS\nBạn muốn có một cách nhanh chóng, rẻ và đơn giản để tạo ra một chiếc áo phông độc đáo? Hãy ghé thăm San Francisco Custom T-Shirts trên Phố 18 vào các ngày trong tuần từ 9 giờ sáng đến 5 giờ chiều. Đội ngũ chuyên gia thiết kế của chúng tôi sẽ giúp bạn tạo ra bất kỳ chiếc áo phông nào bạn có thể tưởng tượng. Chúng tôi cung cấp mức giảm giá 15% cho các đơn hàng số lượng lớn từ 50 chiếc trở lên. Nếu bạn không hài lòng 100% với sản phẩm của mình, hãy mang trả lại cửa hàng trong vòng 14 ngày kèm hóa đơn để được hoàn tiền đầy đủ.\n\n--------------------------------------------------\n\nPHIẾU ĐẶT HÀNG\nKhách hàng: Kenji Okata | Công ty: Okata Logistics\nĐịa chỉ giao hàng: 450 Mission Street, San Francisco, CA\nSản phẩm đặt: Áo thun cổ tròn màu xanh navy in logo công ty ở ngực trái và slogan ở mặt sau.\nSố lượng: 60 chiếc (Size M: 20, Size L: 30, Size XL: 10)\nĐơn giá: $15.00/chiếc -> Tổng tiền ban đầu: $900.00\nGiảm giá đơn hàng số lượng lớn (15%): -$135.00\nPhí giao hàng tiêu chuẩn: Miễn phí\nTổng thanh toán: $765.00\nPhương thức thanh toán: Thẻ tín dụng doanh nghiệp"
    },
    {
        "id": "docs2_p7_p12",
        "range": (181, 185),
        "title": "Đoạn 12 (Q181-185): Đoạn Kép: Thư trao đổi trang trí nội thất giữa Martha Gale và Mark Summers",
        "vn_trans": "Email 1: Gửi: Martha Gale <mgale@interiordesign.com>\nTừ: Mark Summers <msummers@speedmail.com>\nNgày: 25 tháng 6\nChủ đề: Đồ nội thất và màu sơn cho ngôi nhà mới\n\nChào Martha,\nTôi đã gửi kèm một số hình ảnh về đồ đạc hiện tại của tôi (images of his belongings) mà tôi muốn chuyển sang ngôi nhà mới tại Oakridge. Ngôi nhà này trước đây đã có người ở (had previous occupants) nhưng tôi muốn sơn lại và thiết kế lại không gian. Tôi đặc biệt thích chiếc ghế sofa đôi màu trắng nhưng không chắc nó có phù hợp với phòng khách hay không. Xin vui lòng cho tôi ý kiến chuyên môn của bạn.\n\n--------------------------------------------------\n\nEmail 2: Gửi: Mark Summers\nTừ: Martha Gale, Nhà thiết kế nội thất\nNgày: 27 tháng 6\n\nChào Mark,\nCảm ơn bạn đã gửi các bức ảnh. Về chiếc ghế sofa đôi, tôi nghĩ nó sẽ không vừa vặn lắm trong phòng nghe nhạc nhỏ, nhưng sẽ rất hoàn hảo khi đặt ở góc phòng khách rộng. Về màu sơn, tôi sẽ tiến hành đặt hàng màu sơn xanh dương và vàng cho nhà bếp và phòng ăn. Đối với hai phòng còn lại, tôi đề xuất màu be hoặc màu ngà voi. Tuần tới, tôi sẽ trực tiếp mang một số mẫu vật liệu vải và màu sơn đến cho bạn xem trước khi chúng ta chốt phương án cuối cùng."
    },
    {
        "id": "docs2_p7_p13",
        "range": (186, 190),
        "title": "Đoạn 13 (Q186-190): Đoạn Ba: Thông báo đào tạo của Dayton Bank, Phiếu đăng ký & Email của Bernard Hinds",
        "vn_trans": "VĂN BẢN 1: THÔNG BÁO TỪ NGÂN HÀNG DAYTON BANK\nNgân hàng Dayton Bank thường xuyên tài trợ các khóa học phát triển kỹ năng bên ngoài cho nhân viên. Bắt đầu từ ngày 1 tháng 4, Trung tâm Pittman Training sẽ một lần nữa mở các khóa học sau đây cho chúng ta, có thể học tại cơ sở hoặc trực tuyến. Tất cả các khóa học đều cấp chứng chỉ khi hoàn thành.\n1. Nghiệp vụ Giao dịch viên Hiệu quả (3 tuần, T2/T4/T6 8:30-11:30 sáng, không yêu cầu điều kiện tiên quyết).\n2. Phát triển Nhân viên Ngân hàng (2 tuần, T3/T5 1:30-6:00 chiều, điều kiện tiên quyết: phải hoàn thành khóa Nghiệp vụ Giao dịch viên trước khi tham gia).\n3. Quản trị Rủi ro Tín dụng (1 tuần, T2-T6 1:00-5:00 chiều, điều kiện: nhân viên làm việc từ 2 năm trở lên).\n\n--------------------------------------------------\n\nVĂN BẢN 2: PHIẾU ĐĂNG KÝ KHÓA HỌC (PITTMAN TRAINING)\nHọc viên: Bernard Hinds\nĐịa chỉ: 121 Rosemont Avenue, Chicago, Illinois\nKhóa học đăng ký: Phát triển Nhân viên Ngân hàng (Bank Employee Development)\nLịch học lựa chọn: Thứ Ba / Thứ Năm (Tues./Thur.)\nĐáp ứng điều kiện tiên quyết (Prerequisite): Có (Yes) -> Nghĩa là Bernard Hinds đã từng học khóa Nghiệp vụ Giao dịch viên trước đó.\nThanh toán bằng séc gửi qua đường bưu điện tới: Pittman Training, 9000 South Emerald Avenue, Chicago, IL 60620. Đăng ký qua séc sẽ được xác nhận qua email trong vòng 3 ngày làm việc sau khi nhận được séc.\n\n--------------------------------------------------\n\nVĂN BẢN 3: EMAIL CỦA BERNARD HINDS\nGửi: Pittman Training <inquiries@pittmantraining.com>\nNgày: 26 tháng 3\nTôi viết thư để theo dõi việc đăng ký khóa học Phát triển Nhân viên Ngân hàng. Tôi đã gửi thanh toán bằng séc cách đây một tuần và đã nhận được email xác nhận. Tuy nhiên, tôi vẫn chưa nhận được giáo trình môn học. Ngoài ra, một đồng nghiệp của tôi cũng rất muốn đăng ký khóa học này cùng tôi. Dù đã quá hạn chót đăng ký nhưng không biết trung tâm có thể xem xét ngoại lệ nếu lớp còn chỗ trống hay không?"
    },
    {
        "id": "docs2_p7_p14",
        "range": (191, 195),
        "title": "Đoạn 14 (Q191-195): Đoạn Ba: Bản ghi nhớ kỳ nghỉ công ty Vora Advertising, Lịch trình & Email từ Trang trại Holbrook",
        "vn_trans": "VĂN BẢN 1: BẢN GHI NHỚ NỘI BỘ VORA ADVERTISING\nTừ: Joseph Tran, Giám đốc Nhân sự\nGửi: Toàn thể nhân viên\nChủ đề: Kỳ nghỉ dưỡng kết hợp tập huấn thường niên của công ty tại Trang trại Holbrook River Ranch từ ngày 15 đến 17 tháng 9. Phương tiện di chuyển: xe buýt công ty sẽ đón tại trụ sở lúc 8:00 sáng. Bà Salazar đã tình nguyện sử dụng xe cá nhân chở một số thiết bị âm thanh và tài liệu tập huấn.\n\n--------------------------------------------------\n\nVĂN BẢN 2: LỊCH TRÌNH HOẠT ĐỘNG DỰ KIẾN\n- Ngày 1: Nhận phòng, họp định hướng, ăn trưa, hội thảo kỹ năng sáng tạo quảng cáo, ăn tối BBQ ngoài trời.\n- Ngày 2: Bữa sáng, hoạt động trải nghiệm dã ngoại có hướng dẫn (chèo thuyền kayak và cưỡi ngựa - guided leisure activity), nghỉ trưa, trò chơi xây dựng đội ngũ, tiệc tối gala.\n- Ngày 3: Bữa sáng, chụp ảnh lưu niệm toàn công ty, hoạt động dã ngoại có hướng dẫn (đi bộ xuyên rừng - guided leisure activity), phát biểu bế mạc của Tổng Giám đốc, lên xe về thành phố lúc 3:00 chiều.\n\n--------------------------------------------------\n\nVĂN BẢN 3: EMAIL TỪ STEVEN OLIVER (HOLBROOK RIVER RANCH)\nGửi: Joseph Tran <j.tran@voraadvertising.com>\nNgày: 12 tháng 8\nChào Joseph, chúng tôi đã nhận được các yêu cầu chuẩn bị của bạn. Chúng tôi hoàn toàn có thể đáp ứng thực đơn ăn kiêng và ăn chay theo các sở thích khác nhau của nhân viên bạn. Chúng tôi cũng đã bố trí phòng riêng theo danh sách bạn gửi. Tuy nhiên, về phòng hội trường phụ (annex), chúng tôi hiện chưa có đủ bàn ghế theo yêu cầu vì đang có một đoàn khác sử dụng. Tôi gợi ý bạn nên ăn sáng tại nhà hàng chính của trang trại thay vì yêu cầu phục vụ đồ ăn tại khu nhà nghỉ."
    },
    {
        "id": "docs2_p7_p15",
        "range": (196, 200),
        "title": "Đoạn 15 (Q196-200): Đoạn Ba: Trang web cửa hàng miễn thuế Botwell, Thông báo nội bộ & Hóa đơn của Emilia Fortich",
        "vn_trans": "VĂN BẢN 1: TRANG WEB CỬA HÀNG BÁCH HÓA BOTWELL\nSắp Khai Trương ... Mua Sắm Miễn Thuế tại Trung Tâm Bách Hóa Botwell\nTọa lạc tại trung tâm Cape Town, Cửa hàng Bách hóa Botwell vui mừng thông báo vào ngày 12 tháng 4 sẽ khai trương cửa hàng miễn thuế mới dành cho tất cả du khách quốc tế trên tầng 5 của tòa nhà bách hóa. Cửa hàng cung cấp các mặt hàng cao cấp như mỹ phẩm, nước hoa, rượu, trang sức. Nhân dịp khai trương, tất cả các sản phẩm của Moreno Luggage và Lydia Cosmetics sẽ được giảm giá 20% cho đến ngày 15 tháng 5. Khách hàng cần xuất trình hộ chiếu và vé máy bay quốc tế khởi hành trong vòng 28 ngày. Thành viên chương trình Khách hàng Thân thiết Botwell sẽ được giảm thêm 10%.\n\n--------------------------------------------------\n\nVĂN BẢN 2: THÔNG BÁO NỘI BỘ GỬI NHÂN VIÊN THU NGÂN\nTôi rất cảm ơn mọi người đã giúp tuần khai trương đầu tiên của cửa hàng miễn thuế thành công tốt đẹp. Tuy nhiên, xin lưu ý hai điều quan trọng:\nThứ nhất, chính sách của chúng tôi là tặng phiếu ưu đãi mua sắm (voucher) cho tất cả khách hàng có hóa đơn mua hàng từ $500 trở lên để sử dụng trên các trang web đối tác. Xin hãy nhớ trao phiếu này cho mọi khách hàng đủ điều kiện.\nThứ hai, nếu thành viên khách hàng thân thiết quên hoặc làm mất thẻ, chúng ta không thể áp dụng giá giảm ngay lúc thanh toán. Tuy nhiên, họ có thể giữ lại hóa đơn để được hoàn lại tiền chênh lệch sau khi tìm lại hoặc được cấp lại thẻ mới.\nLưu ý an ninh sân bay (CTAA): Du khách chỉ được phép mang chất lỏng/gel trên 100ml lên máy bay nếu mua tại cửa hàng miễn thuế và được bọc kín (enclosed/secured) trong túi nhựa có niêm phong chính thức của CTAA.\n\n--------------------------------------------------\n\nVĂN BẢN 3: HÓA ĐƠN MUA HÀNG CỦA EMILIA FORTICH\nNgày phát hành: 19 tháng 4\nKhách hàng: Emilia Fortich | Quốc tịch: Tây Ban Nha | Hộ chiếu: XCV81324\nChuyến bay: Vela Airways VI342 | Ngày bay: 21 tháng 4 | Điểm đến: Madrid, Tây Ban Nha\nDanh mục hàng mua:\n1. Túi xách da Riley (màu mận): $160.00\n2. Son môi Lydia Cosmetics (được giảm giá 20% theo chương trình khai trương): $46.00\n3. Máy ảnh kỹ thuật số Leganz: $258.00\n4. Khăn quàng cổ Daphne Boutique: $62.00\nTỔNG HÓA ĐƠN: $526.00 (Đạt trên $500 -> đủ điều kiện nhận voucher mua sắm đối tác)."
    }
]

print("Passage metadata count:", len(passage_meta))
