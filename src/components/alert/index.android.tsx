import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';
import { AlertProps } from './types';
import { Colors } from '@/constants/colors';

const TYPE_ICONS: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'i',
};

const TYPE_COLORS = {
    error:   { bg: Colors.semantic.error.bg,   border: Colors.semantic.error.border,   text: Colors.semantic.error.text },
    success: { bg: Colors.semantic.success.bg, border: Colors.semantic.success.border, text: Colors.semantic.success.text },
    warning: { bg: Colors.semantic.warning.bg, border: Colors.semantic.warning.border, text: Colors.semantic.warning.text },
    info:    { bg: Colors.semantic.info.bg,    border: Colors.semantic.info.border,    text: Colors.semantic.info.text },
};

const AlertAndroid: React.FC<AlertProps> = ({ title, message, visible, onClose, type = 'info' }) => {
    const fadeAnim  = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim,  { toValue: 1, duration: 250, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
            ]).start();

            const timer = setTimeout(() => handleClose(), 5000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    function handleClose() {
        Animated.parallel([
            Animated.timing(fadeAnim,  { toValue: 0, duration: 200, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 40, duration: 200, useNativeDriver: true }),
        ]).start(() => {
            fadeAnim.setValue(0);
            slideAnim.setValue(40);
            onClose();
        });
    }

    const theme = TYPE_COLORS[type];

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose} statusBarTranslucent>
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.card,
                        {
                            backgroundColor: theme.bg,
                            borderLeftColor: theme.border,
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Ícone */}
                    <View style={[styles.iconCircle, { backgroundColor: theme.border }]}>
                        <Text style={styles.iconText}>{TYPE_ICONS[type]}</Text>
                    </View>

                    {/* Texto */}
                    <View style={styles.textArea}>
                        <Text style={[styles.titleText, { color: theme.text }]}>{title}</Text>
                        <Text style={[styles.messageText, { color: theme.text }]}>{message}</Text>
                    </View>

                    {/* Fechar */}
                    <TouchableOpacity onPress={handleClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Text style={[styles.closeText, { color: theme.text }]}>✕</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderLeftWidth: 5,
        padding: 16,
        gap: 12,
        elevation: 8,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textArea: {
        flex: 1,
    },
    titleText: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 2,
    },
    messageText: {
        fontSize: 13,
        opacity: 0.85,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
        opacity: 0.6,
    },
});

export default AlertAndroid;
